import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let appModule = null;

async function loadApp() {
  if (appModule) return appModule;
  try {
    appModule = await import(join(__dirname, '../dist/index.js'));
    return appModule;
  } catch (err) {
    console.error('Failed to load app:', err);
    throw err;
  }
}

export default async function handler(req, res) {
  try {
    const mod = await loadApp();
    const app = mod.default;
    
    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = `${protocol}://${host}${req.url}`;
    
    // Prepare fetch request
    const init = { 
      method: req.method, 
      headers: req.headers,
    };
    
    // Handle body for non-GET/HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      if (typeof req.body === 'object') {
        init.body = JSON.stringify(req.body);
      } else {
        init.body = req.body;
      }
    }
    
    // Create request and get response
    const response = await app.fetch(new Request(url, init), { 
      DB: null, // Vercel will inject D1 if configured
      env: {}
    });
    
    // Set response status and headers
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Send response body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: error.message });
  }
}