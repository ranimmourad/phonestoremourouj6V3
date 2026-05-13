export default async function handler(req, res) {
  // Dynamically import the built app
  const mod = await import('../dist/index.js');
  const app = mod.default;

  // Convert Vercel request to standard Request
  const url = `http://localhost${req.url}`;
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  // Fetch through Hono app
  const response = await app.fetch(request, { DB: null });
  
  // Set status and headers
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  // Send the HTML/JSON response
  const text = await response.text();
  res.send(text);
}
