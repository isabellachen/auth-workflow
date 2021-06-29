import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { signUp, signIn } from '../Services/Api';

const Home = ({ setUserData, userData, setAuthenticated }) => {
  const [signUpResponse, setSignUpResponse] = useState({
    success: false,
    error: false,
    message: ''
  });
  const [signInResponse, setSignInResponse] = useState({
    success: false,
    error: false,
    message: ''
  });
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const newUser = await signUp({ name, email, password });
      if (newUser) {
        setUserData({ ...userData, ...newUser });
        window.localStorage.setItem('access_token', newUser['access_token']);
        setAuthenticated(true);
        setSignUpResponse({
          ...signUpResponse,
          error: false,
          success: true,
          message: 'Sign up success!'
        });
      }
      return;
    } catch (err) {
      setSignUpResponse({
        ...signUpResponse,
        error: true,
        success: false,
        message: err.toString()
      });
    }
  };

  const handleSignIn = async ({ email, password }) => {
    try {
      const signedInUser = await signIn({ email, password });
      if (signedInUser) {
        setUserData({ ...userData, ...signedInUser });
        window.localStorage.setItem(
          'access_token',
          signedInUser['access_token']
        );
        setAuthenticated(true);
        //TODO: Is this necessary since user is redirected?
        setSignInResponse({
          ...signUpResponse,
          error: false,
          success: true,
          message: 'Sign in success!'
        });
      }
      return;
    } catch (err) {
      setSignInResponse({
        ...signUpResponse,
        error: true,
        success: false,
        message: err.toString()
      });
    }
  };

  return (
    <div>
      <SignUpForm handleSignUp={handleSignUp} response={signUpResponse} />
      <SignInForm handleSignIn={handleSignIn} response={signInResponse} />
    </div>
  );
};

export default Home;
