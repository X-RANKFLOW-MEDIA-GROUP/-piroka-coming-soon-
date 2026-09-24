module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  try {
    const upstream = await fetch('https://piroka-coming-soon-kl9ctx.v2.appdeploy.ai/api/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
      signal: AbortSignal.timeout(5000)
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'waitlist_unavailable' });
    }

    return res.status(200).json({ joined: true });
  } catch {
    return res.status(502).json({ error: 'waitlist_unavailable' });
  }
};
