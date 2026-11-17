import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

const dbPath = path.join(__dirname, 'db', 'db.json');
const distPath = path.join(__dirname, 'dist');
const assetsPath = path.join(__dirname, 'src', 'assets');

app.use(express.json());
app.use('/assets', express.static(assetsPath));

app.get('/api', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/:resource', (req, res) => {
  const { resource } = req.params;

  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);

    if (!db[resource]) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.json(db[resource]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to read database' });
  }
});

app.get('/api/:resource/:id', (req, res) => {
  const { resource, id } = req.params;

  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    const collection = db[resource];

    if (!collection) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const item = Array.isArray(collection) ? collection.find((entry) => String(entry.id) === String(id)) : null;

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to read database' });
  }
});

app.post('/api/:resource', (req, res) => {
  const { resource } = req.params;
  const payload = req.body;

  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    const collection = db[resource];

    if (!Array.isArray(collection)) {
      return res.status(400).json({ message: 'This resource does not support create operations' });
    }

    collection.push(payload);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return res.status(201).json(payload);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to write database' });
  }
});

app.put('/api/:resource', (req, res) => {
  const { resource } = req.params;
  const payload = req.body;

  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);

    if (resource in db && db[resource] && typeof db[resource] === 'object' && !Array.isArray(db[resource])) {
      db[resource] = { ...db[resource], ...payload };
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      return res.json(db[resource]);
    }

    return res.status(400).json({ message: 'This resource does not support update operations' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to update database' });
  }
});

app.delete('/api/followers/:id', (req, res) => {
  const { id } = req.params;

  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    const followers = db.followers || [];
    const nextFollowers = followers.filter((follower) => String(follower.id) !== String(id));
    db.followers = nextFollowers;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return res.json({ removed: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete follower' });
  }
});

app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }

  return res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
