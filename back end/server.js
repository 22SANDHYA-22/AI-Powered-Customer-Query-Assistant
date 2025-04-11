const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// ✅ Debug log to confirm correct file
console.log("💡 ACTUALLY RUNNING THE CORRECT server.js FILE 💡");

app.use(cors());
app.use(express.json());

console.log("⚡ Registering routes...");

// GET route for ping test
app.get('/ping', (req, res) => {
    console.log("✅ GET /ping hit");
    res.send('pong');
});

// SMART AI-style chat reply route
app.post('/api/chat', (req, res) => {
  console.log("✅ POST /api/chat hit");

  const { message, inventoryContext } = req.body;
  console.log("Message:", message);
  console.log("Inventory Context:", inventoryContext);

  let reply = "";

  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("order")) {
      reply = `Hi! We're checking the status of your order. Good news — "${inventoryContext}" is currently available and being prepared for shipment.`;
  } else if (
      lowerMsg.includes("available") ||
      lowerMsg.includes("stock") ||
      lowerMsg.includes("availability")
  ) {
      reply = `Yes! Based on current records, "${inventoryContext}" is in stock and ready for purchase.`;
  } else {
      reply = `Thanks for your query! We'll get back to you regarding: "${inventoryContext}".`;
  }

  res.json({ reply });
});

// ✅ Catch-all 404 should be outside routes
app.use((req, res) => {
    res.status(404).send("❌ Route not found");
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
