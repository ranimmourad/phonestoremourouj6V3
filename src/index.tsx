import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { initDatabase, createDBProxy } from './db';
// ... your other imports

const app = new Hono();

// Initialize DB lazily on first request
app.use('*', async (c, next) => {
  await initDatabase();
  await next();
});

app.use('/api/*', cors());

// Your routes...
app.get('/api/phones', (c) => {
  const db = createDBProxy();
  const result = db.prepare('SELECT * FROM phones').all();
  return c.json(result);
});

// ... rest of your routes

export default app;