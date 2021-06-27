import React from 'react';

const Home = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      <p>User is logged in: {JSON.stringify(loggedIn)}</p>
      <button onClick={() => setLoggedIn(true)}>Sign Up</button>
      <button onClick={() => setLoggedIn(true)}>Sign In</button>
    </div>
  );
};

export default Home;
