const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', error => {
    console.warn(error);
  });

beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
