import React, { Fragment } from 'react';

export const NameInputComponent = ({ handleNameChange, name }) => {
  return (
    <Fragment>
      <label>Name</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
    </Fragment>
  );
};
export const EmailInputComponent = ({ handleEmailChange, email }) => {
  return (
    <Fragment>
      <label>Name</label>
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
    </Fragment>
  );
};
export const PasswordInputComponent = ({ handlePasswordChange, name }) => {
  return (
    <Fragment>
      <label>Password</label>
      <input
        type="text"
        id="password"
        placeholder="Password"
        value={name}
        onChange={handlePasswordChange}
      />
    </Fragment>
  );
};
