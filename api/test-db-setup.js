import mongoose from 'mongoose';
import cuid from 'cuid';
import _ from 'lodash';
import { beforeEach } from '@jest/globals';
import { User } from './src/model/index';

const url = `mongodb://localhost:27017/${process.env.TEST_DB_NAME}-`;

// const models = { User };

global.newId = () => {
  return mongoose.Types.ObjectId();
};

const remove = (collection) =>
  new Promise((resolve, reject) => {
    collection.remove((err) => {
      if (err) return reject(err);
      resolve();
    });
  });

beforeEach(async (done) => {
  // As tests are run in parallel, we have to create unique databases for each describe block
  const uniqString = cuid();
  function clearDB() {
    return Promise.all(
      _.map(mongoose.connection.collections, (c) => remove(c))
    );
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + uniqString, {
        useNewUrlParser: true,
        autoIndex: true
      });
      await clearDB();
      // await Promise.all(Object.keys(models).map((name) => models[name].init()));
      await User.init();
    } catch (e) {
      console.log('connection error');
      console.error(e);
      throw new Error(e);
    }
  } else {
    await clearDB();
  }
  done();
});

afterEach((done) => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => mongoose.disconnect().then(() => done()));
  // await mongoose.disconnect();
  // done();
  // return;
});
afterAll((done) => {
  done();
  // return;
});
