const mongoose = require('mongoose');
const User = require('../src/models/User');
const Comment = require('../src/models/Comment');
const BlogPost = require('../src/models/BlogPost');

describe('associations', () => {
  let bob;
  let blogPost;
  let comment;
  beforeEach(done => {
    //
    bob = new User({ name: 'Bob' });
    blogPost = new BlogPost({
      title: 'Best Burgers',
      content: 'Make the burger of the day.'
    });
    comment = new Comment({ content: 'What is the burger of the day?' });

    bob.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = bob;
  });
});
