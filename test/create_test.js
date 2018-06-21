const assert = require('assert');
const User = require('../src/models/User');

describe('Creating records', () => {
  it('saves a user', done => {
    // create new user
    const bob = new User({ name: 'Bob' });
    // save it to DB
    bob.save().then(() => {
      // make sure it was successful
      assert(!bob.isNew);
      done();
    });
  });
});
