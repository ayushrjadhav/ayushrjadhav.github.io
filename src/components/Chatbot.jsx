// src/components/Chatbot.jsx

import { useState, useMemo } from "react";

// --- Tiny safe formatter: escape → bold → bullets → links → paragraphs ---
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function linkify(html) {
  const urlRe = /(https?:\/\/[\w.-]+(?:\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?)/gi;
  return html.replace(urlRe, (m) => `<a href="${m}" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80">${m}</a>`);
}

function applyBold(html) {
  // **bold** → <strong>
  return html.replace(/\*\*(.+?)\*\*/g, '<strong>$1<\/strong>');
}

function mdFormat(text) {
  // Escape first
  const safe = escapeHTML(text || "");
  const lines = safe.split(/\r?\n/);
  const out = [];
  let listOpen = false;

  function closeList() { if (listOpen) { out.push('</ul>'); listOpen = false; } }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { closeList(); out.push('<p></p>'); continue; }

    if (/^(?:[-•])\s+/.test(line)) {
      if (!listOpen) { out.push('<ul class="ml-5 list-disc space-y-1">'); listOpen = true; }
      const item = line.replace(/^(?:[-•])\s+/, '');
      out.push(`<li>${applyBold(item)}</li>`);
    } else {
      closeList();
      out.push(`<p>${applyBold(line)}</p>`);
    }
  }
  closeList();

  // Linkify at the end
  return linkify(out.join('\n'));
}

// --- Typing dots animation (no extra deps) ---
function TypingDots() {
  const dotCls = "inline-block h-2 w-2 rounded-full bg-neutral-400";
  return (
    <div className="flex items-center gap-1" aria-hidden>
      <span className={`${dotCls} animate-bounce`} style={{ animationDelay: "0ms" }} />
      <span className={`${dotCls} animate-bounce`} style={{ animationDelay: "120ms" }} />
      <span className={`${dotCls} animate-bounce`} style={{ animationDelay: "240ms" }} />
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Ayush AI. Ask me about his projects or skills!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---- Placement: bottom-right + safe-area (iOS notch) ----
  const floatingPos = {
    right: "1.5rem",
    bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
  };

  // ---- OpenAI config (optional; local dev only) ----
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const systemPrompt = useMemo(
    () =>
      [
        "You are Ayush AI, a polished and professional assistant for ayushjadhav.com.",
        "Speak with clarity, confidence, and professionalism. Format answers cleanly, using short paragraphs and crisp bullet points.",
        "Primary description of Ayush (use this when summarizing him):",
        "Ayush is an Applied AI Engineer who specializes in building scalable, production-ready AI agents and operational machine-learning systems. His work spans generative AI workflows, predictive modeling, optimization engines, and full-stack application development. He has designed systems using Azure OpenAI, AWS Lambda, .NET, React, SQL, and modern cloud architectures.",
        "His past work includes wildfire‑risk prediction using SVM/Random Forest models, an LLM-powered scheduling system used by hundreds of students, and enterprise software enhancements within WEC Energy Group’s operational ecosystem. Ayush combines engineering discipline with product intuition—focusing on reliability, clarity, and business impact in every solution he builds.",
        "In short: Ayush is someone who can design, build, deploy, and support AI systems that matter in real operations.",
        "When asked about his background, skills, résumé, or experience, use the above description.",
        "When asked for the résumé, link to /resume.pdf and offer a brief summary.",
        "If you don’t know something, be concise and direct the user to the Projects page.",
      ].join(" "),
    []
  );

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    // Quick heuristic: if user asks for resume, offer the link immediately
    const t = text.toLowerCase();
    if (t.includes("resume") || t.includes("cv")) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Here’s the résumé: /resume.pdf — want a brief summary?" },
      ]);
      setLoading(false);
      return;
    }

    try {
      if (!apiKey) {
        // No API key — keep the classic placeholder so nothing breaks in prod/static
        await new Promise((r) => setTimeout(r, 600));
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "(Demo mode) This is a placeholder response. Add VITE_OPENAI_API_KEY in .env.local for live answers.",
          },
        ]);
        return;
      }

      // Build short chat history
      const history = messages
        .slice(-8)
        .map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));

      const body = {
        model: "gpt-4o-mini",
        temperature: 0.6,
        messages: [{ role: "system", content: systemPrompt }, ...history, { role: "user", content: text }],
      };

      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status} — ${errText}`);
      }

      const data = await resp.json();
      const answer = data?.choices?.[0]?.message?.content?.trim() || "Sorry — I couldn’t generate a response.";

      setMessages((prev) => [...prev, { sender: "bot", text: answer }] );
    } catch (e) {
      console.error(e);
      setError(String(e?.message || e));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "There was an issue contacting the AI service. Check your .env.local (VITE_OPENAI_API_KEY).",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Dock Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed z-[10000] bg-black text-white px-5 py-3 rounded-2xl shadow-xl hover:opacity-90 transition border border-white/90"
          style={floatingPos}
          aria-label="Open Ayush AI chat"
          title="Open Ayush AI"
        >
          Ayush AI
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed z-[10000] w-80 md:w-96 h-[500px] bg-white shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-black/10"
          style={floatingPos}
        >
          {/* Header */}
          <div className="p-4 bg-black text-white flex justify-between items-center">
            <span className="font-semibold">Ayush AI</span>
            <button onClick={() => setOpen(false)} className="text-white hover:opacity-70">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[78%] px-4 py-3 rounded-2xl break-words ${
                  msg.sender === "user"
                    ? "ml-auto bg-gradient-to-b from-black to-neutral-900 text-white shadow-sm"
                    : "bg-white border border-black/10 shadow-sm"
                }`}
              >
                <div
                  className="text-[15px] leading-7 tracking-[-0.005em] whitespace-pre-wrap selection:bg-black/10 [&_p]:mb-2 [&_ul]:mb-2 [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: mdFormat(msg.text) }}
                />
              </div>
            ))}

            {loading && (
              <div className="max-w-[60%] px-4 py-3 rounded-2xl bg-white border border-black/10 shadow-sm inline-flex items-center gap-3">
                <TypingDots />
                <span className="sr-only">Ayush AI is typing</span>
              </div>
            )}

            {error && (
              <div className="max-w-[90%] px-3 py-2 text-xs rounded-md bg-rose-50 border border-rose-200 text-rose-700">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-black/10 bg-white flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 rounded-xl border border-black/20 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-xl hover:opacity-90 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}