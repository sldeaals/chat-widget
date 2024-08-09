"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChatBubbleLeftIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Message from "@/components/Message";
import useScrollToBottom from "@/utils/useScrollToBottom";
import { fetchMessages } from "@/utils/fetchMessages";
import { sendMessage } from "@/utils/sendMessage";

const ChatWidget = ({ prompts = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  const senderId = process.env.NEXT_PUBLIC_USER_ID;
  const messagesEndRef = useScrollToBottom([messages, isOpen]);

  const updateMessages = useCallback(async () => {
    if (isOpen) {
      const updatedMessages = await fetchMessages();
      setMessages(updatedMessages);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      updateMessages();
    }
  }, [isOpen, updateMessages]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        await sendMessage(senderId, formData);
        setFile(null);
        await updateMessages();
      } catch (error) {
        console.error("Failed to send file:", error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() || file) {
      const formData = new FormData();
      formData.append("content", inputValue);
      if (file) formData.append("file", file);

      try {
        await sendMessage(senderId, formData);
        setInputValue("");
        setFile(null);
        await updateMessages();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleClose = useCallback(() => {
    setIsMaximized(false);
    setIsOpen(false);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        isMaximized ? "top-0 left-0 w-full h-full" : isOpen ? "w-80 h-96" : "w-16 h-16"
      } transition-all duration-300 z-50`}
      style={{ zIndex: 9999 }}
    >
      {isOpen && (
        <div
          className={`flex flex-col h-full bg-gray-800 text-white rounded-lg shadow-lg ${
            isMaximized ? "w-full h-full" : ""
          }`}
        >
          <div className="flex items-center justify-between p-2 border-b border-gray-600">
            <h2 className="text-lg font-semibold">Chat</h2>
            <div className="flex items-center space-x-2">
              <Button
                className="p-1"
                onClick={() => setIsMaximized(!isMaximized)}
              >
                {isMaximized ? (
                  <ArrowsPointingInIcon className="h-6 w-6" />
                ) : (
                  <ArrowsPointingOutIcon className="h-6 w-6" />
                )}
              </Button>
              <Button
                className="p-1 bg-red-500 rounded-full text-white"
                onClick={handleClose}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <Message key={index} msg={msg} senderId={senderId} />
              ))
            ) : (
              <p className="text-gray-400">No messages yet.</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t border-gray-600">
            <div className="flex flex-row items-center">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow h-10 mb-2 text-black resize-none"
                style={{ overflowY: "auto" }}
              />
              <div className="flex flex-col items-center">
                <div className="relative flex items-center">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="flex items-center justify-center w-12 h-9 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <DocumentIcon className="h-6 w-6 text-white" />
                  </label>
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="w-12 h-9 mb-2 bg-blue-500 rounded text-white"
                >
                  Send
                </Button>
              </div>
            </div>
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
      )}
      {!isOpen && (
        <Button
          className="p-2 bg-blue-500 rounded-full text-white flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatWidget;
