export const SignUp = (data) => {
  const URI = 'http://localhost:3001'; //TODO save root uri to environment variable
  return fetch(`${URI}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((json) => json);
};

export const SignIn = async () => {};
