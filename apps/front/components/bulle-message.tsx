import React from 'react';

interface MessageBubbleProps {
  sender: boolean;
  message: string;
  error?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, message, error = false }) => {
  const bubbleClassName = `message-bubble ${(sender ? 'true' : 'false')} ${error ? 'error' : ''}`;

  return (
    <div className={`message ${sender ? 'sended-message' : 'received-message'}`}>
      <div className={bubbleClassName}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
