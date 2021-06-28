import React, { useState } from 'react';
import './SignUpForm.scss';

const SignUpForm = (props) => {
  const { handleSignUp, error } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (evt) => {
    const newValue = evt.target.value;
    console.log('name: ', newValue);
    setName(newValue);
  };

  const handleEmailChange = (evt) => {
    const newValue = evt.target.value;
    console.log('email: ', newValue);
    setEmail(newValue);
  };

  const handlePasswordChange = (evt) => {
    const newValue = evt.target.value;
    console.log('password: ', newValue);
    setPassword(newValue);
  };

  return (
    <div className="signup">
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <label for="email">Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignUp({ name, email, password });
          }}
        >
          Sign Up
        </button>
      </form>
      <div>{error.message}</div>
    </div>
  );
};

export default SignUpForm;
