import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

User.createUser = (userData) => {
  const { email, password } = userData;
  const newUser = new User({
    email,
    password
  });
  return newUser.save();
};

export { User };
