import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
  password_conf: string;
}

interface RegisterFormProps {
  onSubmit: (formData: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    password_conf: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.password_conf) {
      console.log('Les mots de passe ne correspondent pas.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="register-form-container">
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_conf">Confirm mot de passe :</label>
          <input
            type="password"
            id="password_conf"
            name="password_conf"
            value={formData.password_conf}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterForm;
