import React from 'react';
import './FormElements.scss';

export const NameInputComponent = ({ handleNameChange, name }) => {
  return (
    <div className="input-element">
      <label>Name</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
};
export const EmailInputComponent = ({ handleEmailChange, email }) => {
  return (
    <div className="input-element">
      <label>Email</label>
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
    </div>
  );
};
export const PasswordInputComponent = ({ handlePasswordChange, name }) => {
  return (
    <div className="input-element">
      <label>Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={name}
        onChange={handlePasswordChange}
      />
    </div>
  );
};
