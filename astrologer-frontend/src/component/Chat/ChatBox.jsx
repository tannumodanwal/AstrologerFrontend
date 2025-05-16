// src/Component/chat/ChatBox.jsx
import React, { useState, useEffect } from "react";
import stompClient from "../../service/websocket";
import Message from "./Message";
import MessageInput from "./MessageInput";

const ChatBox = ({ senderId, receiverId, senderRole }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    stompClient.onConnect = () => {
      console.log("WebSocket connected ✅");

      // Subscribe to topic
      stompClient.subscribe("/topic/messages", (message) => {
        const received = JSON.parse(message.body);
        setMessages((prev) => [...prev, received]);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers['message']);
      console.error("Additional details: " + frame.body);
    };

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, []);

 const sendMessage = (content) => {
  const message = {
    senderId,
    receiverId,
    message: content,
    timestamp: new Date(),
  };

  stompClient.publish({
    destination: "/app/sendMessage",
    body: JSON.stringify(message),
  });

  // ❌ Ye line hata do — yahi duplicate ka reason hai
  // setMessages((prev) => [...prev, message]);
};

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <div className="h-64 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} currentUserId={senderId} />
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatBox;
