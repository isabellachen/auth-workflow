import React, { useState, useEffect } from 'react';
import { isValidName, isValidEmail, isValidPassword } from '../Helpers/helpers';
import './SignUpForm.scss';

const SignUpForm = (props) => {
  const { handleSignUp, response } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    if (isValidName(name) && isValidEmail(email) && isValidPassword(password)) {
      setIsSubmitEnabled(true);
    }
  }, [name, email, password]);

  const checkValidation = (name, email, password) => {
    if (isValidName(name) && isValidEmail(email) && isValidPassword(password)) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
    return;
  };

  const handleNameChange = (evt) => {
    const newNameValue = evt.target.value;
    setName(newNameValue);
    checkValidation(newNameValue, email, password);
  };

  const handleEmailChange = (evt) => {
    const newEmailValue = evt.target.value;
    setEmail(newEmailValue);
    checkValidation(name, newEmailValue, password);
  };

  const handlePasswordChange = (evt) => {
    const newPasswordValue = evt.target.value;
    setPassword(newPasswordValue);
    checkValidation(name, email, newPasswordValue);
  };

  return (
    <div className="signup">
      <form>
        <label>Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <label>Password</label>
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
          disabled={!isSubmitEnabled}
        >
          Sign Up
        </button>
      </form>
      <div>{response.message}</div>
    </div>
  );
};

export default SignUpForm;
