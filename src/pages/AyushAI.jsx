import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const endpoint = import.meta.env.VITE_AYUSH_AI_ENDPOINT || "/api/chat";
const starters = [
  "How did Wischeduler handle course conflicts?",
  "What did Ayush build at WEC Energy Group?",
  "How did the wildfire research model power shutoffs?",
];

function Reply({ message }) {
  return (
    <div className={`message ${message.role}`}>
      <strong>{message.role === "user" ? "You" : "AyushAI"}</strong>
      <p>{message.content}</p>
      {!!message.sources?.length && <ul className="chat-sources" aria-label="Sources">
        {message.sources.map(({ label, path }) => <li key={path}><Link to={path}>{label}</Link></li>)}
      </ul>}
    </div>
  );
}

export default function AyushAI() {
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(false);
  const transcript = useRef(null);

  async function send(messages) {
    if (active.current) return;
    active.current = true;
    setHistory(messages);
    setPending(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages.slice(-11).map(({ role, content }) => ({ role, content })) }),
        signal: AbortSignal.timeout(25000),
      });
      if (response.status === 429) throw new Error("AyushAI is receiving too many requests. Wait a moment and try again.");
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("AyushAI is temporarily unavailable. Try again or browse the projects.");
      }
      const { reply, sources } = await response.json();
      if (typeof reply !== "string" || !reply.trim()) throw new Error("AyushAI returned an empty answer. Try again.");
      setHistory([...messages, { role: "assistant", content: reply, sources }]);
    } catch (err) {
      setError(err.name === "TimeoutError" ? "The request timed out. Try again." :
        err instanceof TypeError || err instanceof SyntaxError ? "AyushAI is temporarily unavailable. Try again or browse the projects." : err.message);
    } finally {
      active.current = false;
      setPending(false);
      requestAnimationFrame(() => {
        if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
      });
    }
  }

  function ask(question) {
    const content = question.trim();
    if (!content || active.current) return;
    setDraft("");
    const previous = error ? history.slice(0, -1) : history;
    send([...previous, { role: "user", content }]);
  }

  return (
    <section className="shell page-section chat">
      <h1 className="page-title">AyushAI</h1>
      <p className="lede">Ask about my projects, engineering experience, or resume.</p>
      <div className="chat-panel">
        {history.length === 0 && <div className="starters">
          {starters.map((question) => <button type="button" className="button secondary" key={question} onClick={() => ask(question)}>{question}</button>)}
        </div>}
        <div className="transcript" role="log" aria-label="Conversation" ref={transcript}>
          {history.map((message, index) => <Reply key={index} message={message} />)}
        </div>
        {pending && <p className="chat-status" role="status">AyushAI is working on an answer…</p>}
        {error && <div className="chat-status"><p role="alert">{error}</p><button type="button" className="button secondary" onClick={() => send(history)}>Retry</button></div>}
        <form className="composer" onSubmit={(event) => { event.preventDefault(); ask(draft); }}>
          <label htmlFor="question">Your question</label>
          <div>
            <input id="question" value={draft} maxLength={1000} onChange={(event) => setDraft(event.target.value)} />
            <button className="button" disabled={pending || !draft.trim()}>Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}
