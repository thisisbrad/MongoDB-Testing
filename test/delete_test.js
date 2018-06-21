const assert = require('assert');
const User = require('../src/models/User');

describe('Deleting Users from the database', () => {
  let bob;

  beforeEach(done => {
    bob = new User({ name: 'Bob' });
    bob.save().then(() => {
      done();
    });
  });

  it('removes by model instance', done => {
    bob.remove().then(() => {
      done();
    });
  });
});
