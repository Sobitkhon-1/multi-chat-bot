import React from "react";

export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 bg-gray-800 rounded p-4 overflow-y-auto flex flex-col space-y-3">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={\`max-w-[75%] p-3 rounded-xl text-white shadow \${msg.sender === "user" ? "bg-blue-600 self-end" : "bg-green-600 self-start"}\`}
        >
          <span className="block text-sm opacity-70 mb-1">
            {msg.sender === "user" ? "You" : "Bot"}
          </span>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
}
