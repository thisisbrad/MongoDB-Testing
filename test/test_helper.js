const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.warn(error);
    });
});

beforeEach(done => {
  const { users, comments, blogPosts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      });
    });
  });
});
