import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../model/index.js';

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user['_id'],
      username: user.email
    },
    process.env.SECRET_KEY, //where should this private key be stored? Is it unique to the user?
    { expiresIn: '3 hours' }
  );
};

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401).send(`You're missing a property`);
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(401).send({ message: 'User already exists' });
    return;
  }

  const newUser = await User.createUser({
    name,
    email,
    password: await bcrypt.hash(password, 10)
  });

  const newUserInfo = newUser['_doc'];

  const token = createToken(newUserInfo);

  res.status(200).send({
    name: newUserInfo.name,
    email: newUserInfo.email,
    access_token: token
  });
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

  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).send('Wrong Password');
    return;
  }
  const token = createToken(user);
  res.status(200).send({ access_token: token });
}

export function profile(req, res) {
  res.status(200).send('A secret resource - only for loggedIn users');
}
