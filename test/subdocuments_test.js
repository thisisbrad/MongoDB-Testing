const assert = require('assert');
const User = require('../src/models/User');

describe('User subdocuments', () => {
  //
  it('can create a subdocument', done => {
    //
    const user = new User({
      name: 'Rick',
      posts: [{ title: 'The Affects of Morty Waves' }]
    });
    user
      .save()
      .then(() => User.findOne({ name: 'Rick' }))
      .then(user => {
        //
        assert(user.posts[0].title === 'The Affects of Morty Waves');
        done();
      });
  });

  it('can add subdocuments to an existing record', done => {
    const user = new User({
      name: 'Rick',
      posts: []
    });
    user
      .save()
      .then(() => User.findOne({ name: 'Rick' }))
      .then(user => {
        //
        user.posts.push({ title: 'The Affects of Morty Waves' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Rick' }))
      .then(user => {
        //
        assert(user.posts[0].title === 'The Affects of Morty Waves');
        done();
      });
  });

  it('can remove an existing subdocument', done => {
    //
    const user = new User({
      name: 'Rick',
      posts: [{ title: 'The Affects of Morty Waves' }]
    });
    user
      .save()
      .then(() => User.findOne({ name: 'Rick' }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Rick' }))
      .then(user => {
        //
        assert(user.posts.length === 0);
        done();
      });
  });
});
