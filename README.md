# CampusConnect Backend

This is the backend for the CampusConnect app.

## 📦 Setup

```bash
npm install
cp .env.example .env
npm start
```

## 🌐 Routes

- `POST /auth/register`
- `POST /auth/login`
- `GET /posts`, `POST /posts`
- `GET /events`, `POST /events`
- `GET /messages?with={userId}`
- `GET /users/:id`

## 💬 Socket.IO

Use JWT to connect and send `private-message` events.
