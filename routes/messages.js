const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticate = require('../middleware/authenticate');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;
  const otherId = parseInt(req.query.with);
  if (!otherId) return res.status(400).json({ error: 'Missing user ID' });

  const result = await pool.query(
    `SELECT * FROM messages WHERE 
     (sender_id = $1 AND receiver_id = $2) OR 
     (sender_id = $2 AND receiver_id = $1) ORDER BY sent_at ASC`,
    [userId, otherId]
  );

  res.json(result.rows.map(m => ({
    from: m.sender_id,
    to: m.receiver_id,
    content: m.content,
    sent_at: m.sent_at
  })));
});

module.exports = router;
