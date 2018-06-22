const mongoose = require('mongoose');
const assert = require('assert');
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

    const saveRequests = [bob.save(), blogPost.save(), comment.save()];

    Promise.all(saveRequests).then(() => done());
  });

  it('saves a relationship between a User and a BlogPost', done => {
    // check for BlogPost._id in User.blogPosts
    User.findOne({ name: 'Bob' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'Best Burgers');
        done();
      });
  });

  it.only('save a full relation graph bewteen User, BlogPost, Comment', done => {
    //
    User.findOne({ name: 'Bob' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        //
        // console.log('???', user.blogPosts[0].comments[0]);
        assert(user.name === 'Bob');
        assert(user.blogPosts[0].title === 'Best Burgers');
        assert(
          user.blogPosts[0].comments[0].content ===
            'What is the burger of the day?'
        );
        assert(user.blogPosts[0].comments[0].user.name === 'Bob');
        done();
      });
  });
});
