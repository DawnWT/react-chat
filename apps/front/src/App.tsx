import React from 'react';
import MessageBubble from '../components/bulle-message.js';

const App = () => {
  return (
    <div>
      <MessageBubble sender={true} message="Hello" />
      <MessageBubble sender={false} message="Hi there" />
      <MessageBubble sender={false} error ={true} message="Hi there" />
    </div>
  );
};

export default App;