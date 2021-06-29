import React, { useState, useEffect } from 'react';
import { getProtectedMessage } from '../Services/Api';

const Profile = (props) => {
  const [message, setMessage] = useState('');
  const { setAuthenticated } = props;

  useEffect(() => {
    const fetchData = async () => {
      const token = window.localStorage.getItem('access_token');
      const protectedMessage = await getProtectedMessage(token);
      setMessage(protectedMessage);
    };

    fetchData();
  });

  console.log(props);
  const { name } = props.userData;
  return (
    <div>
      <h1>Hi {name}</h1>
      <p>{message}</p>
      <button
        onClick={() => {
          window.localStorage.removeItem('access_token');
          setAuthenticated(false);
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
