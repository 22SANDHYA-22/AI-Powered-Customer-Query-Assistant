import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setTyping(true);

    try {
      const inventoryContext = "Laptop available, price: $999, in stock"; // Can fetch from inventory API
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: input,
        inventoryContext,
      });

      setMessages([...newMessages, { sender: 'bot', text: res.data.response }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Error: ' + err.message }]);
    }

    setTyping(false);
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {typing && <div className="typing-indicator">Bot is typing...</div>}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
