import validator from 'validator';

export const isValidName = (name) => {
  return name.length > 2;
};

export const isValidEmail = (email) => {
  return validator.isEmail(email);
};

export const isValidPassword = (password) => {
  return password.length > 3;
};

export const formatError = (str) => {
  const errString = str.split(':')[1];
  return errString.split('"').join('');
};
