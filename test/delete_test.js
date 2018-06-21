const assert = require('assert');
const User = require('../src/models/User');

describe('Deleting Users from the database', () => {
  let bob;

  beforeEach(async () => {
    bob = await new User({ name: 'Bob' });
    await bob.save();
  });

  it('removes by model instance', done => {
    bob
      .remove()
      .then(() => User.findOne({ name: 'Bob' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  // async/await refactor
  // it('removes by model instance async/await', async () => {
  //   await bob.remove();
  //   const result = await User.findOne({ name: 'Bob' });
  //   assert(result === null);
  // });

  it('removes by class method "remove"', done => {
    // Remove all records with name of Bob
    User.remove({ name: 'Bob' })
      .then(() => User.findOne({ name: 'Bob' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('removes by class method "findOneAndRemove"', done => {
    // Find one record with the name of Bob
    User.findOneAndRemove({ name: 'Bob' })
      .then(() => User.findOne({ name: 'Bob' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
