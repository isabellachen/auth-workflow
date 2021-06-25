export function getPublicResource(req, res) {
  res.status(200).send('You are not logged in! Sign up or log in :)');
}

export function getPrivateResource(req, res) {
  res.status(200).send('A secret resource - only for loggedIn users');
}
