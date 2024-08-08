import React from 'react';
import { cn } from "@/lib/utils";

const Message = ({ msg, senderId }) => {
  const { content, file } = msg;
  const isSender = msg.senderId === senderId;

  return (
    <div
      className={cn(
        "p-3 rounded-lg max-w-xs",
        isSender
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-700 text-white"
      )}
    >
      {content && <div>{content}</div>}
      {file && (
        <a href={file.url} download className="block mt-2 text-blue-300 hover:underline">
          {file.name}
        </a>
      )}
    </div>
  );
};

export default Message;
