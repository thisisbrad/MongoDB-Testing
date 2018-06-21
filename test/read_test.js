const assert = require('assert');
const User = require('../src/models/User');

describe('Reading Users from the database', () => {
  let bob;

  beforeEach(done => {
    bob = new User({ name: 'Bob' });
    bob.save().then(() => {
      done();
    });
  });

  it('finds all users by certain name', done => {
    // find users named Bob
    User.find({ name: 'Bob' }).then(users => {
      assert(users[0]._id.toString() === bob._id.toString());
      done();
    });
  });

  it('finds user by ID', done => {
    // find by ID
    User.findOne({ _id: bob._id }).then(user => {
      assert(user.name === 'Bob');
      done();
    });
  });
});
