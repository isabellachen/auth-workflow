function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}

export const SignUp = (data) => {
  const URI = 'http://localhost:3001'; //TODO save root uri to environment variable
  return fetch(`${URI}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err.message);
    });
};

export const SignIn = async () => {};
