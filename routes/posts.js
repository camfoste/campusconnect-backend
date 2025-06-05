const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticate = require('../middleware/authenticate');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get('/', authenticate, async (req, res) => {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  await pool.query(
    'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)',
    [req.user.id, title, content]
  );
  res.sendStatus(201);
});

module.exports = router;
