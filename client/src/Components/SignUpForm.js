import React, { useState, useEffect } from 'react';
import {
  NameInputComponent,
  EmailInputComponent,
  PasswordInputComponent
} from './FormElements';
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
        <NameInputComponent name={name} handleNameChange={handleNameChange} />
        <EmailInputComponent
          email={email}
          handleEmailChange={handleEmailChange}
        />
        <PasswordInputComponent
          password={name}
          handlePasswordChange={handlePasswordChange}
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
