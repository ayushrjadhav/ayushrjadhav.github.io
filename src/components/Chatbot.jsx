// src/components/Chatbot.jsx

import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (pathname.toLowerCase().includes("ayushai")) {
    return null;
  }
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Ayush AI. Ask me about his projects or skills!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showQuick, setShowQuick] = useState(true);
  const [pinned, setPinned] = useState(false);

  function quickNav(route, msg) {
    navigate(route);
    setMessages((prev) => [...prev, { sender: "bot", text: msg }]);
    // Keep quick links visible unless the user manually hides them
  }

  // ---- Placement: bottom-right + safe-area (iOS notch) ----
  const floatingPos = {
    right: "1.5rem",
    bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
  };


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

  // Note: In production, this component expects a serverless function at /api/chat
  // that forwards the messages to OpenAI using your server-side OPENAI_API_KEY.
  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    // --- Intent-based navigation for Case Studies ---
    const lower = text.toLowerCase();
    if (lower.includes("case studies") || lower.includes("open case studies")) {
      navigate("/case-studies");
      setMessages((prev) => [...prev, { sender: "bot", text: "Opening Case Studies..." }]);
      setLoading(false);
      return;
    }
    if (lower.includes("wischeduler") || lower.includes("schedule case")) {
      navigate("/case-studies/wischeduler");
      setMessages((prev) => [...prev, { sender: "bot", text: "Opening the Wischeduler case study..." }]);
      setLoading(false);
      return;
    }
    if (lower.includes("wildfire") || lower.includes("line loading") || lower.includes("risk model")) {
      navigate("/case-studies/wildfire-ml");
      setMessages((prev) => [...prev, { sender: "bot", text: "Opening the Wildfire ML case study..." }]);
      setLoading(false);
      return;
    }
    if (lower.includes("gradey") || lower.includes("chatbot case")) {
      navigate("/case-studies/gradey");
      setMessages((prev) => [...prev, { sender: "bot", text: "Opening the Gradey AI case study..." }]);
      setLoading(false);
      return;
    }

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
      // Build short chat history (last 8 messages for context)
      const history = messages
        .slice(-8)
        .map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: text },
          ],
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status} — ${errText}`);
      }

      const data = await resp.json();
      const answer =
        data?.choices?.[0]?.message?.content?.trim() ||
        data?.message?.trim?.() ||
        data?.reply?.trim?.() ||
        "Sorry — I couldn’t generate a response.";

      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    } catch (e) {
      console.error(e);
      setError(String(e?.message || e));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "There was an issue contacting the AI service. If you're on Vercel, add an /api/chat function and set OPENAI_API_KEY in the project settings.",
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
          onClick={() => { setOpen(true); if (pinned) setShowQuick(true); }}
          className="fixed z-[10000] px-5 py-3 rounded-2xl text-white bg-black border border-white/40 shadow-lg hover:bg-neutral-900 transition"
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
          className="fixed z-[10000] w-80 md:w-96 h-[500px] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-xl rounded-3xl flex flex-col overflow-hidden"
          style={floatingPos}
        >
          {/* Header */}
          <div className="p-4 bg-black text-white flex justify-between items-center">
            <span className="font-semibold">Ayush AI</span>
            <button onClick={() => setOpen(false)} className="text-white hover:opacity-70">✕</button>
          </div>

          {showQuick && (
            <div className="px-4 pt-3 bg-white/70 backdrop-blur border-b border-black/10">
              <div className="text-xs text-neutral-600 mb-2">Quick links</div>
              <div className="flex flex-wrap gap-2 pb-3">
                <button
                  onClick={() => quickNav('/case-studies', 'Opening Case Studies...')}
                  className="px-3 py-1.5 rounded-full bg-neutral-100 border border-black/10 hover:bg-neutral-200 text-sm"
                >
                  Case Studies
                </button>
                <button
                  onClick={() => quickNav('/projects', 'Opening Projects...')}
                  className="px-3 py-1.5 rounded-full bg-neutral-100 border border-black/10 hover:bg-neutral-200 text-sm"
                >
                  Projects
                </button>
                <button
                  onClick={() => quickNav('/about', 'Opening About...')}
                  className="px-3 py-1.5 rounded-full bg-neutral-100 border border-black/10 hover:bg-neutral-200 text-sm"
                >
                  About
                </button>
                <button
                  onClick={() => { setPinned(!pinned); if (!pinned) setShowQuick(true); }}
                  className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-800 border border-black/10 rounded-md"
                >
                  {pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  onClick={() => setShowQuick(false)}
                  className="ml-auto px-2 py-1 text-xs text-neutral-500 hover:text-neutral-700"
                  aria-label="Hide quick links"
                >
                  Hide
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[78%] px-4 py-3 rounded-2xl break-words ${
                  msg.sender === "user"
                    ? "ml-auto bg-white text-black border border-black/10 shadow-sm"
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