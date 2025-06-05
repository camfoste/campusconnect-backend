const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticate = require('../middleware/authenticate');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get('/', authenticate, async (req, res) => {
  const result = await pool.query('SELECT * FROM events ORDER BY date');
  res.json(result.rows);
});

router.post('/', authenticate, async (req, res) => {
  const { title, date, location } = req.body;
  await pool.query(
    'INSERT INTO events (title, date, location) VALUES ($1, $2, $3)',
    [title, date, location]
  );
  res.sendStatus(201);
});

module.exports = router;
