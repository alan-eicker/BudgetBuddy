const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  assword: String,
});

const User = model('Users', UserSchema);
