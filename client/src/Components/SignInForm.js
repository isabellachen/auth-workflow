import React, { useState, useEffect } from 'react';
import { EmailInputComponent, PasswordInputComponent } from './FormElements';
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
    } else {
      setIsSubmitEnabled(false);
    }
  }, [email, password]);

  const handleEmailChange = (evt) => {
    const newEmailValue = evt.target.value;
    setEmail(newEmailValue);
  };

  const handlePasswordChange = (evt) => {
    const newPasswordValue = evt.target.value;
    setPassword(newPasswordValue);
  };

  return (
    <div className="signin">
      <form className="d-flex flex-column signin__inner">
        <div>
          <EmailInputComponent
            email={email}
            handleEmailChange={handleEmailChange}
          />
          <PasswordInputComponent
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
        </div>
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
      <div>{response.error && response.message}</div>
    </div>
  );
};

export default SignInForm;
