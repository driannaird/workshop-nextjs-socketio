"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io();

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    setMessages((prevMessages) => [...prevMessages, `You: ${currentMessage}`]);

    socket.emit("message", `People: ${currentMessage}`);

    setCurrentMessage("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold text-center">Chat Room</h1>

      <div className="flex-1 p-4 mb-4 overflow-y-auto bg-white rounded-lg shadow-md">
        {messages.map((message, index) => (
          <p key={index} className="p-2 border-b border-gray-200">
            {message}
          </p>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />

        <button
          onClick={sendMessage}
          className="p-2 text-white transition duration-200 bg-blue-500 rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
