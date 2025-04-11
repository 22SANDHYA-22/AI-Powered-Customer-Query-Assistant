import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        inventoryContext: context,
      }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div>
      <h1>Customer Query Assistant</h1>
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter item context"
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>Reply: {reply}</p>
    </div>
  );
}

export default App;
