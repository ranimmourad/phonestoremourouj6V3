export default async function handler(req, res) {
  const mod = await import("../dist/index.js");
  const app = mod.default;
  const url = "http://localhost" + req.url;
  const init = { method: req.method, headers: req.headers };
  if (req.method !== "GET" && req.method !== "HEAD") init.body = JSON.stringify(req.body);
  const response = await app.fetch(new Request(url, init), { DB: null });
  res.status(response.status);
  response.headers.forEach((v, k) => res.setHeader(k, v));
  res.send(await response.text());
}
