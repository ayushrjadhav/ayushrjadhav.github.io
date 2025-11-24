export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = await req.json?.() ?? await new Promise((r) => {
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => r(JSON.parse(body || '{}')));
    });

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing messages array' });
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.3
      })
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(r.status).send(err);
    }

    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e?.message || 'Server error' });
  }
}