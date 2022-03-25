const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
});

const User = model('Users', UserSchema);

module.exports = User;
