import React from 'react';
import { SignUp, SignIn } from '../Services/Api';

const Home = ({ setUserData, userData }) => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = await SignUp({
      name: 'isa',
      email: 'isa@gmail.com',
      password: '123'
    });
    setUserData({ ...userData, ...newUser });
    return;
  };
  return (
    <div>
      <p>User is logged in: {JSON.stringify(userData)}</p>
      <button onClick={handleSignUp}>Sign Up</button>
      {/* <button onClick={() => setSignedIn(true)}>Sign In</button> */}
    </div>
  );
};

export default Home;
