import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { createToken, signUp, signIn, profile } from '../controllers/auth';
import { User } from '../model/index';
import { describe } from 'yargs';
import { TestResult } from '@jest/types';

describe('Authentication: ', () => {
  describe('Creates new token', () => {
    TestResult('creates new jwt from user', () => {
      const user = { sub: 123 };
      const token = createToken(user);
      const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
      expect(verifiedUser.sub).toBe(user.sub);
    });
  });
});
