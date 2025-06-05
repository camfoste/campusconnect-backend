const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

function initSocket(server, jwtSecret) {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Auth token required'));
    try {
      const user = jwt.verify(token, jwtSecret);
      socket.user = user;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    socket.join(`user:${userId}`);
    socket.on('private-message', ({ to, content }) => {
      const message = {
        from: userId,
        to,
        content,
        sent_at: new Date().toISOString()
      };
      io.to(`user:${to}`).emit('private-message', message);
    });
  });
}

module.exports = { initSocket };
