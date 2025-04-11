// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple route to test
app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
