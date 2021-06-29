async function handleErrors(res) {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res;
}

export const signUp = (data) => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleErrors)
    .then((res) => res.json());
};

export const signIn = async (data) => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/sign-in`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleErrors)
    .then((res) => res.json());
};

export const getProtectedMessage = async (token) => {
  const bearer = 'Bearer ' + token;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/me`, {
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
    .then((res) => res.json());
};
