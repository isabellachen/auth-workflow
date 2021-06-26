import jwt from 'jsonwebtoken';
import { User } from '../model/index.js';

export async function signUp(req, res) {
  const { email, password } = req.body;
  const userData = { email, password };

  const user = await User.findOne({ email });

  if (user) {
    res.status(401).send('User already exists');
    return;
  }
  const newUser = await User.createUser(userData);
  res.status(200).send(JSON.stringify(newUser));
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('Username and password must be provided');
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).send('User not found');
    return;
  }
  if (user.password !== password) {
    res.status(401).send('Wrong Password');
    return;
  }
  const token = jwt.sign(
    {
      sub: user['_id'],
      username: email
    },
    process.env.SECRET_KEY, //where should this private key be stored? Is it unique to the user?
    { expiresIn: '3 hours' }
  );
  res.status(200).send({ access_token: token });
}

export function profile(req, res) {
  res.status(200).send('A secret resource - only for loggedIn users');
}
