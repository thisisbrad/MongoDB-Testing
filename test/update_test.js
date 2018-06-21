const assert = require('assert');
const User = require('../src/models/User');

describe('Updating Users from the database', () => {
  let bob;

  beforeEach(async () => {
    bob = await new User({ name: 'Bob' });
    await bob.save();
  });

  const assertName = async operation => {
    await operation;
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Alex');
  };

  it('asserts with helper function', async () => {
    // testing helper
    bob.set('name', 'Alex');
    await assertName(bob.save());
  });

  it('updates by instance using set n save', async () => {
    // Update record using set and save methods
    bob.set('name', 'Alex');
    await bob.save();
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Alex');
  });

  it('updates by instance model', async () => {
    await assertName(bob.update({ name: 'Alex' }));
  });
});
