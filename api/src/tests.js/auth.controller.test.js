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

    it('should return correct response if new user created successfully', async () => {
      const fakeUser = createFakeUser();
      const userId = 'my-user-id';
      const req = { body: fakeUser };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res)
      };
      const newUser = {
        _doc: {
          _id: userId,
          ...fakeUser
        }
      };
      User.createUser.mockResolvedValue(newUser);
      await authController.signUp(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      const responseBody = res.json.mock.calls[0][0];
      expect(responseBody.name).toBe(fakeUser.name);
      expect(responseBody.email).toBe(fakeUser.email);
      const accessToken = responseBody.access_token;
      const decodedToken = jwt.verify(accessToken, JWT_SECRET);
      expect(decodedToken).toEqual(
        expect.objectContaining({
          email: fakeUser.email,
          id: userId
        })
      );
    });
  });

  it.each(['name', 'email', 'password'])(
    'should return HTTP 400, given %p is not provided',
    async (propertyNotProvided) => {
      const fakeUser = createFakeUser();
      const req = {
        body: {
          ...fakeUser,
          [propertyNotProvided]: undefined
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res)
      };

      await authController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    }
  );
});

function createFakeUser() {
  return {
    name: 'isa',
    email: 'isa@gmail.com',
    password: '1234'
  };
}
