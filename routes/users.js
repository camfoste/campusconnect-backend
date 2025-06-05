const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query('SELECT id, name FROM users WHERE id = $1', [id]);
  const user = result.rows[0];
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
