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
  posts: [PostSchema],
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }],
  likes: Number
});

UserSchema.virtual('postCount').get(function() {
  // return total number of posts
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  // this === bob
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } });
  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
