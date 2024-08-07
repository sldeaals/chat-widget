'use client';

import { useState } from "react";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

const ChatWidget = ({ prompts = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() || file) {
      const formData = new FormData();
      formData.append("content", inputValue);
      if (file) formData.append("file", file);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: "POST",
        body: formData,
      });

      setInputValue("");
      setFile(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
      const updatedMessages = await response.json();
      setMessages(updatedMessages);
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        isOpen ? "w-80 h-96" : "w-16 h-16"
      } transition-all duration-300`}
    >
      {isOpen ? (
        <div className="flex flex-col h-full bg-gray-800 text-white rounded-lg shadow-lg">
          <div className="flex-1 overflow-y-scroll p-2">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 border-b border-gray-600">
                {msg}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-600">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border rounded my-2 text-black"
            />
            <button
              onClick={handleSendMessage}
              className="w-full p-2 bg-blue-500 rounded text-white"
            >
              Send
            </button>
            {prompts.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Suggested Prompts:</p>
                <ul>
                  {prompts.map((prompt, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-blue-400 hover:underline"
                      onClick={() => setInputValue(prompt)}
                    >
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          className="p-2 bg-blue-500 rounded-full text-white flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
