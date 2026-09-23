module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  try {
    const upstream = await fetch('https://piroka-coming-soon-kl9ctx.v2.appdeploy.ai/api/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(req.body || {})
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader('content-type', 'application/json');
    return res.send(text);
  } catch {
    return res.status(502).json({ error: 'waitlist_unavailable' });
  }
};