module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  try {
    const upstream = await fetch(`https://piroka-coming-soon-kl9ctx.v2.appdeploy.ai/api/waitlist/${encodeURIComponent(id || '')}`);
    const text = await upstream.text();
    res.status(upstream.status).setHeader('content-type', 'application/json');
    return res.send(text);
  } catch {
    return res.status(502).json({ error: 'waitlist_unavailable' });
  }
};