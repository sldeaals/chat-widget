'use client';

import { useState/*, useEffect*/ } from "react";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
//import io from 'socket.io-client';

//const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');

const ChatWidget = ({ prompts = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  /*
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);
  */
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() || file) {
      const formData = new FormData();
      formData.append("content", inputValue);
      if (file) formData.append("file", file);

      const userId = process.env.NEXT_PUBLIC_USER_ID;

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: "POST",
        headers: {
          'x-user-id': userId,
        },
        body: formData,
      });

      setInputValue("");
      setFile(null);

      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
      const updatedMessages = await response.json();
      setMessages(updatedMessages);
      
      //socket.emit('chat message', { content: inputValue, file });
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
          <Button
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white"
            onClick={() => setIsOpen(false)}
          >
            X
          </Button>
          <div className="flex-1 overflow-y-auto p-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="p-2 border-b border-gray-600">
                  {msg.content}
                </div>
              ))
            ) : (
              <p>No messages yet.</p>
            )}
          </div>
          <div className="p-2 border-t border-gray-600">
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border rounded my-2 text-black resize-none"
              rows="1"
              style={{ overflowY: 'auto' }}
            />
            <Button
              onClick={handleSendMessage}
              className="w-full p-2 bg-blue-500 rounded text-white"
            >
              Send
            </Button>
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
