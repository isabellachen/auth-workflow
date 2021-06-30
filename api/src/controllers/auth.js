import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../model/index.js';

export const createToken = (user, secretKey, expiry) => {
  const token = jwt.sign(
    {
      id: user['_id'],
      email: user.email
    },
    secretKey,
    { expiresIn: expiry }
  );
  return token;
};

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json(`You're missing a property`);
    return;
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json('User already exists');
    return;
  }

  const newUser = await User.createUser({
    name,
    email,
    password: await bcrypt.hash(password, 10)
  });

  const newUserInfo = newUser['_doc'];

  const token = createToken(
    newUserInfo,
    process.env.SECRET_KEY,
    process.env.TOKEN_EXPIRY
  );

  res.status(200).json({
    name: newUserInfo.name,
    email: newUserInfo.email,
    access_token: token
  });
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json('Username and password must be provided');
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json('User not found');
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400).json('Wrong password');
    return;
  }
  const token = createToken(
    user,
    process.env.SECRET_KEY,
    process.env.TOKEN_EXPIRY
  );
  console.log(user);
  res
    .status(200)
    .json({ name: user.name, email: user.email, access_token: token });
}

export function profile(req, res) {
  res.status(200).json('Resource only for authenticated users');
}
