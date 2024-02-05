import React from 'react';

interface MessageBubbleProps {
  sender: boolean;
  message: string;
  error?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, message, error }) => {
  const bubbleClassName = `message-bubble ${typeof sender === 'boolean' ? (sender ? 'true' : 'false') : ''} ${error ? 'error' : ''}`;

  return (
    <div className={bubbleClassName}>
      <p>{message}</p>
    </div>
  );
};

export default MessageBubble;
