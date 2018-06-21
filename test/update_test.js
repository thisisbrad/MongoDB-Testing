const assert = require('assert');
const User = require('../src/models/User');

describe('Updating Users from the database', () => {
  let bob;

  beforeEach(async () => {
    bob = await new User({ name: 'Bob', postCount: 0 });
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

  it('updates by model instance', done => {
    //
    assertName(bob.update({ name: 'Alex' }), done);
  });

  it('updates by model class', done => {
    //
    assertName(User.update({ name: 'Bob' }, { name: 'Alex' }), done);
  });

  it('can find and update by model class', done => {
    //
    assertName(User.findOneAndUpdate({ name: 'Bob' }, { name: 'Alex' }), done);
  });

  it('can find and update with ID by model class', done => {
    //
    assertName(User.findByIdAndUpdate(bob._id, { name: 'Alex' }), done);
  });

  it('can increment postcount by 1', done => {
    //
    User.update({ name: 'Bob' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Bob' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
