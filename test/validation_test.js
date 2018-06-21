const assert = require('assert');
const User = require('../src/models/User');

describe('Validating records', () => {
  it('requires a username', () => {
    // Model name property is required
    const user = new User({ name: undefined });
    const result = user.validateSync();
    const { message } = result.errors.name;
    assert(message === 'Name is required.');
  });

  it("requires a user's name to be longer than 2", () => {
    //
    const user = new User({ name: 'Al' });
    const result = user.validateSync();
    const { message } = result.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', done => {
    //
    const user = new User({ name: 'Al' });
    user.save().catch(({ errors }) => {
      //
      const { message } = errors.name;
      assert(message === 'Name must be longer than 2 characters.');
      done();
    });
  });
});
