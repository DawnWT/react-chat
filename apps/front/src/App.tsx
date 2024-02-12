import React from 'react';
import RegisterForm from '../src/components/RegisterForm.js';

const App = () => {
  const handleRegister = (formData: any) => {};

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default App;
