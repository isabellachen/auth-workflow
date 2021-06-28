async function handleErrors(res) {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res;
}

export const signUp = (data) => {
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
    .catch((err) => {
      console.error(err);
    });
};

export const signIn = async (data) => {
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
    .catch((err) => {
      console.error(err);
    });
};

export const getProtectedMessage = async (token) => {
  const URI = 'http://localhost:3001'; //TODO save root uri to environment variable
  const bearer = 'Bearer ' + token;
  console.log(bearer);
  return fetch(`${URI}/me`, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
};

// export const getProtectedMessage = async (token) => {
//   const URI = 'http://localhost:3001'; //TODO save root uri to environment variable
//   return fetch(`${URI}/public`, {
//     method: 'GET'
//   })
//     .then(handleErrors)
//     .then((res) => res.json())
//     .catch((err) => {
//       console.error(err);
//     });
// };
