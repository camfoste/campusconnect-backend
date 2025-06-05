const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();
const { initSocket } = require('./socket');

const app = express();
const http = require('http').createServer(app);
initSocket(http, process.env.JWT_SECRET);

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const eventsRoutes = require('./routes/events');
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/events', eventsRoutes);
app.use('/messages', messagesRoutes);
app.use('/users', usersRoutes);

http.listen(3001, () => console.log('Server running on http://localhost:3001'));
