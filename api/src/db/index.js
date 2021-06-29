import mongoose from 'mongoose';

export default (dbName) => {
  mongoose.connect(`mongodb://localhost:27017/${dbName}`);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('connected to mongo');
  });
};
