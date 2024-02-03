const express = require('express');
const linkRoutes = require('./routes/linkRoutes');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const EXTRA_EXTERNAL_URL = process.env.EXTRA_EXTERNAL_ACCESS_ORIGIN || null;
const PORT = process.env.PORT || 3001;

const app = express();

const cors = {
  origin: [CLIENT_URL, EXTRA_EXTERNAL_URL],
  default: CLIENT_URL
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    cors.origin.includes(req.headers.origin) ? req.headers.origin : cors.default
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.use(express.json());

app.use('/', linkRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}\n`);
});
