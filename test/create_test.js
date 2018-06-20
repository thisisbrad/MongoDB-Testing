const assert = require('assert');
const User = require('../src/models/User');

describe('Creating records', () => {
  it('saves a user', () => {
    // create new user
    const bob = new User({ name: 'Bob' });
    // save it to DB
    bob.save();
    // make sure it was successful
  });
});
