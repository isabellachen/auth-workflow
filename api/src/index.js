import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import routes from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(routes);

const users = [
  { id: 1, username: 'isa', password: '123' },
  { id: 2, username: 'carl', password: '456' }
];

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password must be provided');
    return;
  }

  const user = users.find((u) => {
    return u.username === req.body.username;
  });

  if (!user) {
    res.status(401).send('User not found');
    return;
  }

  if (req.body.password !== user.password) {
    res.status(401).send('Wrong Password');
    return;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    'tempPrivateKey', //where should this private key be stored? Is it unique to the user?
    { expiresIn: '3 hours' }
  );
  res.status(200).send({ access_token: token });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
