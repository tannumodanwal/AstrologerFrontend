const Message = ({ message, currentUserId }) => {
  const isSender = parseInt(message.senderId) === parseInt(currentUserId);

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default Message;
