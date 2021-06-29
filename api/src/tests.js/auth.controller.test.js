import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { createToken, signUp, signIn, profile } from '../controllers/auth';
import { User } from '../model/index';
import { test } from '@jest/globals';
import db from '../db/index.js';

const TEST_DB_NAME = 'auth-workflow-test';
db(TEST_DB_NAME);

test('creates new jwt from user', async () => {
  const user = { _id: 'a8sdaji39Q' };
  const secret = 'secret';
  const expiry = '3h';
  const token2 = createToken(user, secret, expiry);
  const verified = await jwt.verify(token2, secret);
  console.log(verified);
  expect(verified.id).toBe(user['_id']);
});

test('should save user to db on sign-up', async () => {});

// beforeEach(async () => {
//   const UNIQ_STRING = cuid();
//   const url = `mongodb://localhost:27017/${TEST_DB_NAME}-${UNIQ_STRING}`;
//   await mongoose.connect(url);
// });

// afterEach(async (done) => {
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.disconnect();
//   return done();
// });

// test('should save user to db on sign-up', async (done) => {
//   const UNIQ_STRING = cuid();
//   const url = `mongodb://localhost:27017/${TEST_DB_NAME}-${UNIQ_STRING}`;
//   await mongoose.connect(url);

//   const res = await request(app)
//     .post('/sign-up')
//     .send({
//       name: 'pingoo',
//       email: 'pingoo@gmail.com',
//       password: '1234'
//     })
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       return done();
//     });
//   console.log(res);

//   await mongoose.connection.close();
//   await mongoose.disconnect();

//   done();
//   expect('1').toBe(user['1']);
// });
