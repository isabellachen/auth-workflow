import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authController from '../controllers/auth.js';
import { User } from '../model/index.js';

jest.mock('../model/index.js', () => {
  return {
    User: {
      findOne: jest.fn(),
      createUser: jest.fn()
    }
  };
});

const JWT_SECRET = 'secret-key';

describe('controllers/auth', () => {
  let originalProcessEnv;
  beforeAll(() => {
    process.env = {
      SECRET_KEY: JWT_SECRET,
      TOKEN_EXPIRY: '3h'
    };
  });

  afterAll(() => {
    process.env = originalProcessEnv;
  });

  describe('signUp', () => {
    it('should create a new user, given user does not exist', async () => {
      const fakeUser = createFakeUser();
      const req = { body: fakeUser };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res)
      };
      const newUser = {
        _doc: {
          _id: 'my-user-id',
          ...fakeUser
        }
      };
      User.createUser.mockResolvedValue(newUser);

      await authController.signUp(req, res);

      expect(User.createUser).toHaveBeenCalledTimes(1);
      const createUserArgs = User.createUser.mock.calls[0][0];
      expect(createUserArgs.name).toBe(fakeUser.name);
      expect(createUserArgs.email).toBe(fakeUser.email);
      const isValidHash = await bcrypt.compare(
        fakeUser.password,
        createUserArgs.password
      );
      expect(isValidHash).toBe(true);
    });
  });
});

function createFakeUser() {
  return {
    name: 'isa',
    email: 'isa@gmail.com',
    password: '1234'
  };
}
