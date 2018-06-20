const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: String
});

const User = model('user', UserSchema);

module.exports = User;
