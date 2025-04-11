const express = require('express');
const router = express.Router();
const { askOpenAI } = require('../utils/openai');

router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await askOpenAI(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

