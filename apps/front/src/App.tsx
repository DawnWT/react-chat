import React from 'react';
import MessageBubble from '../components/bulle-message.js';

const App = () => {
  return (
    <div>
      <MessageBubble sender message="Hello" />
      <MessageBubble sender={false} message="Hi there" />
      <MessageBubble sender={false} error message="Hi there" />
    </div>
  );
};

export default App;