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
});
