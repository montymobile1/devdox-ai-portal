// server.js
const express = require('express');
const path = require('path');

const app = express();

// Disable X-Powered-By header for security
app.disable('x-powered-by');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
