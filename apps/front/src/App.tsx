import React from 'react';
import LoginForm from './components/LoginForm.js';

const App = () => {
  const handleLoginSubmit = (formData: any) => {};

  return (
    <div>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default App;
