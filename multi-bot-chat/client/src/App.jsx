import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bot, setBot] = useState("gemini");

  const handleSend = async (e) => {
    e.preventDefault();
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bot, message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <aside className="w-1/5 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      </aside>

      <main className="w-4/5 flex flex-col p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <label>Select Bot:</label>
          <select value={bot} onChange={(e) => setBot(e.target.value)} className="bg-gray-700 p-2 rounded">
            <option value="gemini">Gemini</option>
            <option value="groq">Groq</option>
            <option value="openai">OpenAI</option>
          </select>
        </div>

        <ChatWindow messages={messages} />

        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            className="flex-1 bg-gray-700 p-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Send</button>
        </form>
      </main>
    </div>
  );
}
