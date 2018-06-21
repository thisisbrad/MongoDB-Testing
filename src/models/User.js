const mongoose = require('mongoose');
const PostSchema = require('../models/PostSchema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    // maxlength: 2,
    trim: true,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    }
  },
  posts: [PostSchema]
});

UserSchema.virtual('postCount').get(function() {
  // return total number of posts
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
