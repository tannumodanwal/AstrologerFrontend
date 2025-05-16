
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim( )) {
      onSend(input);
      setInput("");
    }
  };

    return (
    <div className="flex">
      <input
        type="text"
        className="flex-grow border rounded-l px-4 py-2"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Send
      </button>
    </div>
    );

};

export default MessageInput;
