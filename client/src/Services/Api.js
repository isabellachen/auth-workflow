async function handleErrors(res) {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
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
      console.log(err);
    });
};

export const SignIn = async (data) => {
  const URI = 'http://localhost:3001'; //TODO save root uri to environment variable
  return fetch(`${URI}/sign-in`, {
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
      console.log(err);
    });
};
