const assert = require('assert');
const User = require('../src/models/User');

describe('Vitrual types', () => {
  it('postCount returns total number of posts', done => {
    //
    const user = new User({
      name: 'Rick',
      posts: [{ title: 'The Affects of Morty Waves' }]
    });

    user
      .save()
      .then(() => User.findOne({ name: 'Rick' }))
      .then(user => {
        //
        assert(user.postCount === 1);
        done();
      });
  });
});
