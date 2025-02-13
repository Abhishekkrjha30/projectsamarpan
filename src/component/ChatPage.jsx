import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm interested in buying your project.", user: "buyer" },
    { id: 2, text: "Sure! What do you want to know?", user: "seller" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [role, setRole] = useState("buyer"); // "buyer" or "seller" to simulate both users

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, user: role },
      ]);
      setNewMessage("");
      // Toggle between "buyer" and "seller"
      setRole(role === "buyer" ? "seller" : "buyer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          Chat for Buying/Selling Projects 
        </h1>
        <h3 className="font-bold text-xl text-red-500">Work is in progress........</h3>

        <motion.div
          className="bg-gray-50 p-4 rounded-lg overflow-auto h-80 sm:h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`mb-4 p-3 rounded-lg ${
                message.user === "buyer"
                  ? "bg-indigo-100 text-indigo-700 self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p>{message.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center mt-6">
          <input
            type="text"
            className="flex-1 p-3 text-sm sm:text-base border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <motion.button
            onClick={handleSendMessage}
            className="p-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-all duration-200"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Send
          </motion.button>
        </div>

        {/* Link to go back to the home page */}
        <div className="mt-6 text-center">
          <Link
            to="/home"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
