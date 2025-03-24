import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { useAuthStore } from "../../store/useAuthStore";
import download from "./../../assets/download.png";
import chatbot_icon from "./../../assets/chatbot_icon.png";
import chatbot_typing from "./../../assets/chatbot_typing.png";

const ChatBot = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const chatButtonRef = useRef(null); // Add a ref for the chatbot button

  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem("chatHistory");
      setMessages([]);
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatBoxRef.current &&
        !chatBoxRef.current.contains(event.target) &&
        chatButtonRef.current &&
        !chatButtonRef.current.contains(event.target) // Exclude the chatbot button
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessages = [
      ...messages,
      { sender: "user", text, time: timestamp },
    ];
    setMessages(newMessages);
    sessionStorage.setItem("chatHistory", JSON.stringify(newMessages));

    setIsTyping(true);

    try {
      const response = await axios.get("/api/chatbot", { params: { text } });
      const botReply = response.data.reply;

      const updatedMessages = [
        ...newMessages,
        {
          sender: "bot",
          text: botReply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(updatedMessages);
      sessionStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Chatbot error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <button
        ref={chatButtonRef} // Attach the ref to the button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition duration-300 ease-in-out"
      >
        <img
          src={chatbot_icon}
          alt="chatbot_logo"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg"
        />
      </button>

      {isOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-24 sm:bottom-28 right-5 w-72 sm:w-96 h-[500px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-300 z-50"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 text-center font-bold text-lg flex justify-between items-center rounded-t-2xl">
            <span>AI Chatbot</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 scrollbar-hide">
            {!user ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-700 font-medium text-lg text-center">
                  Please login to chat with AI
                </p>
                <Link
                  to="/login"
                  className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Login
                </Link>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                {/* AI Assistant Illustration */}
                <img
                  src={chatbot_icon}
                  alt="AI Assistant"
                  className="w-24 h-24 opacity-80"
                />

                {/* Welcoming Text */}
                <p className="text-gray-700 font-semibold text-lg text-center">
                  Hi there! I'm your AI Assistant. <br /> How can I help you
                  today?
                </p>

                {/* Suggested Questions */}
                <div className="flex flex-col space-y-2 w-3/4">
                  {[
                    "How does AI Grader work?",
                    "How can I submit an assignment?",
                    "What is the deadline policy?",
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 text-sm text-center"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* AI Profile Picture */}
                  {msg.sender !== "user" && (
                    <img
                      src={chatbot_typing}
                      alt="AI"
                      className="w-12 h-12 rounded-full mr-2"
                    />
                  )}

                  {/* Message Container */}
                  <div className="flex flex-col">
                    <p
                      className={`text-xs text-gray-500 flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "user" ? "You" : "AI"} • {msg.time}
                    </p>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-md">
                      <p className="text-sm text-gray-800">{msg.text}</p>
                    </div>
                  </div>

                  {/* User Profile Picture */}
                  {msg.sender === "user" && (
                    <img
                      src={user.profilePicture || download}
                      alt="User"
                      className="w-12 h-12 rounded-full ml-2"
                    />
                  )}
                </div>
              ))
            )}

            {/* Bot is typing message */}
            {isTyping && user && (
              <div className="flex items-center justify-start">
                <img
                  src={chatbot_typing}
                  alt="AI"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="bg-gray-100 p-3 rounded-lg max-w-xs shadow-md">
                  <p className="text-sm text-gray-800 italic">
                    ChatBot is typing...
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="flex items-center border-t border-gray-300 p-3">
            <input
              type="text"
              placeholder="Type a message..."
              disabled={!user}
              className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  sendMessage(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector("input");
                if (input.value.trim()) {
                  sendMessage(input.value);
                  input.value = "";
                }
              }}
              className="ml-3 text-blue-600 hover:text-blue-800 text-2xl"
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
