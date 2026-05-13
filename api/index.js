import app from '../dist/index.js';

export default async (req, res) => {
  return app.fetch(req);
};

