import React, { useState, useEffect } from 'react';
import {
  NameInputComponent,
  EmailInputComponent,
  PasswordInputComponent
} from './FormElements';
import { isValidEmail, isValidPassword } from '../Helpers/helpers';
import './SignInForm.scss';

const SignInForm = (props) => {
  const { handleSignIn, response } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    if (isValidEmail(email) && isValidPassword(password)) {
      setIsSubmitEnabled(true);
    }
  }, [email, password]);

  const checkValidation = (email, password) => {
    if (isValidEmail(email) && isValidPassword(password)) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
    return;
  };

  const handleEmailChange = (evt) => {
    const newEmailValue = evt.target.value;
    setEmail(newEmailValue);
    checkValidation(newEmailValue, password);
  };

  const handlePasswordChange = (evt) => {
    const newPasswordValue = evt.target.value;
    setPassword(newPasswordValue);
    checkValidation(email, newPasswordValue);
  };

  return (
    <div className="signin">
      <form>
        <EmailInputComponent
          email={email}
          handleEmailChange={handleEmailChange}
        />
        <PasswordInputComponent
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignIn({ email, password });
          }}
          disabled={!isSubmitEnabled}
        >
          Sign In
        </button>
      </form>
      <div>{response.message}</div>
    </div>
  );
};

export default SignInForm;
