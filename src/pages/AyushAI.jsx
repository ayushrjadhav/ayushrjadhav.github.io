import React, { useState, useRef, useEffect } from "react";

export default function AyushAI() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const lastSenderRef = useRef(null);
  const [animateIn, setAnimateIn] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    document.title = "Ayush AI — Chat";
  }, []);

  useEffect(() => {
    // lock page scroll on this route so only the chat container scrolls
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (firstMessageSent) {
      // Wait for the chat view to mount, then animate in
      requestAnimationFrame(() => setAnimateIn(true));
    }
  }, [firstMessageSent]);

  const scrollListToBottom = (behavior = 'smooth') => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  useEffect(() => {
    if (!firstMessageSent) return; // only after chat view exists
    if (!messages || messages.length === 0) return;
    // always keep the newest message in view
    scrollListToBottom('smooth');
  }, [messages, firstMessageSent]);

  // System instruction (Ayush AI prompt)
  const systemInstruction = {
    role: "system",
    content: [
      "You are Ayush AI, a polished and professional assistant for ayushjadhav.com.",
      "Speak with clarity, confidence, and professionalism. Format answers cleanly, using short paragraphs and crisp bullet points.",
      "Primary description of Ayush (use this when summarizing him):",
      "Ayush is an Applied AI Engineer who specializes in building scalable, production-ready AI agents and operational machine-learning systems. His work spans generative AI workflows, predictive modeling, optimization engines, and full-stack application development. He has designed systems using Azure OpenAI, AWS Lambda, .NET, React, SQL, and modern cloud architectures.",
      "His past work includes wildfire-risk prediction using SVM/Random Forest models, an LLM-powered scheduling system used by hundreds of students, and enterprise software enhancements within WEC Energy Group’s operational ecosystem. Ayush combines engineering discipline with product intuition—focusing on reliability, clarity, and business impact in every solution he builds.",
      "In short: Ayush is someone who can design, build, deploy, and support AI systems that matter in real operations.",
      "When asked about his background, skills, résumé, or experience, use the above description.",
      "When asked for the résumé, link to /resume.pdf and offer a brief summary.",
      "If you don’t know something, be concise and direct the user to the Projects page.",
    ].join(" "),
  };

  async function callServerless(history) {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return (
      data?.choices?.[0]?.message?.content?.trim?.() ||
      data?.message?.trim?.() ||
      data?.reply?.trim?.() ||
      "Sorry — I couldn’t generate a response."
    );
  }

  async function callOpenAI(history) {
    if (!apiKey) throw new Error("Missing VITE_API_KEY");
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: history,
      }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return data?.choices?.[0]?.message?.content || "";
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    if (!firstMessageSent) setFirstMessageSent(true);

    const updated = [...messages, userMessage];
    lastSenderRef.current = 'user';
    setMessages(updated);
    // ensure user message remains in view if list overflows
    scrollListToBottom('instant');
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const apiMessages = [
        systemInstruction,
        ...updated.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      ];

      let answer = "";
      try {
        answer = await callServerless(apiMessages);
      } catch (_) {
        answer = await callOpenAI(apiMessages);
      }
      lastSenderRef.current = 'bot';
      setMessages([...updated, { sender: "bot", text: answer }]);
    } catch (err) {
      setMessages([
        ...updated,
        { sender: "bot", text: "Error fetching response. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  // Welcome (pre-chat) screen
  if (!firstMessageSent) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex items-start pt-24">
        <section className="w-full max-w-2xl mx-auto px-6">
          <p className="text-2xl font-medium text-neutral-700 dark:text-neutral-300">Hi!</p>
          <h1 className="mt-1 text-6xl md:text-7xl font-semibold tracking-tight">
            I’m <span className="font-extrabold">AyushAI</span>
          </h1>
          <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">
            Ask about projects, skills, case studies, or architecture.  
          </p>

          <div className="mt-10 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
              placeholder="e.g., Summarize Ayush’s background"
              className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
            >
              Send
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Chat view: bubbles only + fixed bottom send bar
  return (
    <div className="min-h-screen overflow-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Messages */}
      <section
        className={`max-w-3xl mx-auto px-6 pt-6 pb-24 transition-all duration-300 ease-out ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div
          ref={listRef}
          className="space-y-3 h-[calc(100vh-180px)] overflow-y-auto overscroll-contain pr-1"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === "user"
                  ? "ml-auto max-w-[80%] rounded-2xl px-4 py-3 bg-white text-black ring-1 ring-black/10 dark:ring-white/10 shadow-sm"
                  : "mr-auto max-w-[80%] rounded-2xl px-4 py-3 bg-neutral-100 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10"
              }
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="mr-auto max-w-[80%] rounded-2xl px-4 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              <em>Ayush AI is typing…</em>
            </div>
          )}
        </div>
      </section>

      {/* Fixed Send Bar */}
      <div className="fixed bottom-0 inset-x-0 border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
            placeholder="Type a message…"
            className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 shadow-sm"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}