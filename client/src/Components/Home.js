import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import { signUp, signIn } from '../Services/Api';

const Home = ({ setUserData, userData, setAuthenticated }) => {
  const [signUpResponse, setSignUpResponse] = useState({
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
      err.name = '';
      setSignUpResponse({
        ...signUpResponse,
        error: true,
        success: false,
        message: err.toString()
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signedInUser = await signIn({
      email: 'isa@gmail.com',
      password: '123'
    });
    if (signedInUser) {
      setUserData({ ...userData, ...signedInUser });
      window.localStorage.setItem('access_token', signedInUser['access_token']);
      setAuthenticated(true);
    }
    return;
  };

  return (
    <div>
      <SignUpForm handleSignUp={handleSignUp} response={signUpResponse} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Home;
