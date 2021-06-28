import React from 'react';
import { signUp, signIn } from '../Services/Api';

const Home = ({ setUserData, userData, setAuthenticated }) => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = await signUp({
      name: 'isa',
      email: 'isa@gmail.com',
      password: '123'
    });
    if (newUser) {
      setUserData({ ...userData, ...newUser });
      window.localStorage.setItem('access_token', newUser['access_token']);
      setAuthenticated(true);
    }
    return;
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
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Home;
