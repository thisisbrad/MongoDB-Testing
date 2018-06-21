const assert = require('assert');
const User = require('../src/models/User');

describe('Updating Users from the database', () => {
  let bob;

  beforeEach(async () => {
    bob = await new User({ name: 'Bob' });
    await bob.save();
  });

  const assertName = (operation, done) => {
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
  };

  it('asserts with helper function', done => {
    // testing helper
    bob.set('name', 'Alex');
    assertName(bob.save(), done);
  });

  it('updates by instance using set n save', done => {
    // Update record using set and save methods
    bob.set('name', 'Alex');
    bob
      .save()
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  });

  it('updates by instance model', done => {
    //
    assertName(bob.update({ name: 'Alex' }), done);
  });
});
