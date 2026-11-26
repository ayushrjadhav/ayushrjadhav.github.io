import { ayushAnswers } from "../src/data/ayushAnswers.js";
import { projects } from "../src/data/projectdata.js";
import { education, experience, leadership, skills } from "../src/data/profile.js";

const portfolio = [
  { label: "Resume", path: "/about", details: { experience, leadership, education, skills } },
  { label: "WEC experience", path: "/about#experience", details: experience.filter(({ organization }) => organization === "WEC Energy Group") },
  ...projects.map(({ id, title, category, tagline, role, stack, highlights }) => ({
    label: title,
    path: `/projects/${id}`,
    details: { title, category, tagline, role, stack, highlights },
  })),
];

const instructions = [
  "You are AyushAI, the public assistant for Ayush Jadhav's portfolio.",
  "Answer questions about Ayush's professional background and projects using only the portfolio facts below.",
  "If the portfolio doesn't contain an answer, say so. Don't invent results, credentials, or personal details.",
  'Return a JSON object with "reply" (concise plain text) and "sources" (an array of relevant paths from the portfolio).',
  "For resume requests, include /about as a source and direct visitors to the Preview Resume button.",
  JSON.stringify(portfolio),
  "These prepared answers describe Ayush’s perspective in his portfolio voice. Use them for related questions and follow-ups.",
  JSON.stringify(ayushAnswers),
].join("\n");

const requests = new Map();
const minute = 60_000;

function allowRequest(key, now) {
  for (const [client, record] of requests) {
    if (record.expires <= now) requests.delete(client);
  }
  const record = requests.get(key);
  if (record) {
    if (record.count >= 8) return false;
    record.count += 1;
    return true;
  }
  if (requests.size >= 2000) return false;
  requests.set(key, { count: 1, expires: now + minute });
  return true;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && origin === process.env.AYUSH_AI_ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }
  res.setHeader("Cache-Control", "no-store");

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length > 11 || messages.length % 2 !== 1 ||
      !messages.every((message, index) =>
        message?.role === (index % 2 === 0 ? "user" : "assistant") &&
        typeof message.content === "string" && message.content.trim() &&
        message.content.length <= (message.role === "user" ? 1000 : 4000))) {
    return res.status(400).json({ error: "Invalid message history" });
  }

  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "Chat is unavailable" });

  const proxyIp = req.headers["x-vercel-forwarded-for"];
  const client = typeof proxyIp === "string" ? proxyIp.split(",")[0].trim() : req.socket?.remoteAddress;
  if (!allowRequest(client || "unknown", Date.now())) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Too many requests" });
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: instructions },
          ...messages.map(({ role, content }) => ({ role, content })),
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 400,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(18000),
    });
    if (!upstream.ok) return res.status(502).json({ error: "Chat provider unavailable" });

    const data = await upstream.json();
    const { reply, sources } = JSON.parse(data?.choices?.[0]?.message?.content ?? "{}");
    if (typeof reply !== "string" || !reply.trim() || reply.length > 4000) {
      return res.status(502).json({ error: "Invalid chat response" });
    }
    const paths = new Set(Array.isArray(sources) ? sources : []);
    return res.status(200).json({
      reply,
      sources: portfolio.filter(({ path }) => paths.has(path)).map(({ label, path }) => ({ label, path })),
    });
  } catch {
    return res.status(502).json({ error: "Chat provider unavailable" });
  }
}
