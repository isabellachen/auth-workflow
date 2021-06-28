import React, { useState } from 'react';
import './SignUpForm.scss';

const SignUpForm = (props) => {
  const { handleSignUp, response } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const checkValidation = (name, email, password) => {
    console.log(name, email, password);
    if (name.length > 3 && email.length > 3 && password.length > 2) {
      setDisableSubmit(false);
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
          disabled={disableSubmit}
        >
          Sign Up
        </button>
      </form>
      <div>{response.message}</div>
    </div>
  );
};

export default SignUpForm;
