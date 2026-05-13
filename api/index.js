import app from '../dist/index.js';

const readBody = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET' || req.method === 'HEAD') {
      resolve('');
      return;
    }
    
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
};

export default async (req, res) => {
  try {
    const body = await readBody(req);
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    
    const webRequest = new Request(url.href, {
      method: req.method,
      headers: req.headers,
      body: body || undefined,
    });

    const response = await app.fetch(webRequest);
    
    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    
    const text = await response.text();
    res.end(text);
  } catch (error) {
    console.error('Vercel API Error:', error);
    res.status(500).end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};


