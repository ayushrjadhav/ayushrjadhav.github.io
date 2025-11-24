// src/components/Chatbot.jsx
import { useState, useMemo, useEffect } from "react";

/**
 * Ayush AI — OpenAI-connected (client-side with optional proxy)
 *
 * Local (fast):
 *  1) Create .env.local with:
 *     VITE_OPENAI_API_KEY=sk-...
 *     VITE_USE_PROXY=0
 *  2) npm run dev
 *
 * Prod (safe):
 *  - Set VITE_USE_PROXY=1 and deploy /api/chat (serverless proxy below)
 *  - Never expose your OpenAI key client-side in production.
 */

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Ayush AI. Ask me about his projects or skills!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const useProxy = String(import.meta.env.VITE_USE_PROXY || "0") === "1";
  const endpoint = useProxy ? "/api/chat" : "https://api.openai.com/v1/chat/completions";

  const systemPrompt = useMemo(
    () =>
      [
        "You are Ayush AI, a helpful assistant for ayushjadhav.com.",
        "Be concise, specific, and friendly. Use bullets for lists.",
        "If asked about projects, focus on: Wischeduler (LLM+optimization), Wildfire ML (SVM/RF on risk & line loading), Gradey chatbot (.ics export), Cloud AI (Azure OpenAI + AWS Lambda), and Frontend Systems (React/Vite).",
        "If asked for a resume, direct to /resume.pdf on the site.",
        "If you don't know something, say so briefly and suggest the Projects page.",
      ].join(" "),
    []
  );

  useEffect(() => {
    console.log("Ayush AI — useProxy:", useProxy ? "ON (/api/chat)" : "OFF (direct)");
    console.log("Ayush AI — API key present:", !!apiKey);
  }, [useProxy, apiKey]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    const next = [...messages, { sender: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      if (!useProxy && !apiKey) {
        await new Promise((r) => setTimeout(r, 300));
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "OpenAI key not found. Add VITE_OPENAI_API_KEY to .env.local and restart dev server. For production, use a serverless proxy.",
          },
        ]);
        return;
      }

      const history = next.slice(-10).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const body = {
        model: "gpt-4o-mini",
        temperature: 0.6,
        messages: [{ role: "system", content: systemPrompt }, ...history],
      };

      const headers = useProxy
        ? { "Content-Type": "application/json" }
        : {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          };

      const resp = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status} — ${errText}`);
      }

      const data = await resp.json();
      const answer = useProxy
        ? (data?.answer ?? data?.choices?.[0]?.message?.content)
        : data?.choices?.[0]?.message?.content;

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: (answer || "Sorry — I couldn't generate a response.").trim() },
      ]);
    } catch (e) {
      console.error(e);
      setError(String(e?.message || e));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "There was an issue contacting the AI service. Check .env.local (VITE_OPENAI_API_KEY), network, or enable VITE_USE_PROXY=1 with a serverless /api/chat.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Dock Button with tiny status dot */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-2xl shadow-xl hover:opacity-90 transition relative"
          title={useProxy ? "Proxy mode" : apiKey ? "Direct mode" : "Key missing"}
        >
          Ayush AI
          <span
            className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${
              useProxy ? "bg-emerald-500" : apiKey ? "bg-sky-500" : "bg-red-500"
            }`}
          />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-black/10">
          {/* Header */}
          <div className="p-4 bg-black text-white flex justify-between items-center">
            <span className="font-semibold">Ayush AI</span>
            <button onClick={() => setOpen(false)} className="text-white hover:opacity-70">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-4 py-2 rounded-xl ${
                  msg.sender === "user"
                    ? "ml-auto bg-black text-white"
                    : "bg-white border border-black/10"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="max-w-[60%] px-4 py-2 rounded-xl bg-white border border-black/10">
                <span className="inline-block animate-pulse">Thinking…</span>
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