import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

User.createUser = (userData) => {
  const { name, email, password } = userData;
  const newUser = new User({
    name,
    email,
    password
  });
  return newUser.save();
};

export { User };
