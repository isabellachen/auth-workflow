import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import db from './db/index.js';

dotenv.config();
db(process.env.DB_NAME);

const PORT = process.env.PORT || 3001;

export const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('dev'));

app.use(routes);

app.get('*', (req, res) => {
  res.sendStatus(404);
});
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
