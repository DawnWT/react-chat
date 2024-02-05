import React from 'react';

interface MessageBubbleProps {
  sender: string;
  message: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, message }) => {
  return (
    <div className={`message-bubble ${sender === 'me' ? 'me' : 'others'}`}>
      <p>{message}</p>
    </div>
  );
};

export default MessageBubble;
