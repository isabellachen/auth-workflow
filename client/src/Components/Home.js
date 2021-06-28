import React from 'react';
import { SignUp, SignIn } from '../Services/Api';

const Home = ({ setUserData, userData, setAuthenticated }) => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = await SignUp({
      name: 'isa',
      email: 'isa@gmail.com',
      password: '123'
    });
    if (newUser) {
      setUserData({ ...userData, ...newUser });
      setAuthenticated(true);
    }
    return;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signedInUser = await SignIn({
      email: 'isa@gmail.com',
      password: '123'
    });
    if (signedInUser) {
      setUserData({ ...userData, ...signedInUser });
      setAuthenticated(true);
    }
    return;
  };

  return (
    <div>
      <p>User is logged in: {JSON.stringify(userData)}</p>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Home;
