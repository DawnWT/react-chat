import React from 'react';
import MessageBubble from '../components/bulle-message.js';

const App = () => {
  return (
    <div>
      <MessageBubble sender="me" message="Salut, comment ça va ?" />
      <MessageBubble sender="others" message="Ça va bien, merci !" />
    </div>
  );
};

export default App;