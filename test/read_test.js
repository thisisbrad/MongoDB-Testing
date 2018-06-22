const assert = require('assert');
const User = require('../src/models/User');

describe('Reading Users from the database', () => {
  let bob;
  let gene;
  let tina;
  let teddy;

  beforeEach(done => {
    bob = new User({ name: 'Bob' });
    gene = new User({ name: 'Gene' });
    tina = new User({ name: 'Tina' });
    teddy = new User({ name: 'Teddy' });
    const usersRequest = [bob.save(), gene.save(), tina.save(), teddy.save()];

    Promise.all(usersRequest).then(() => done());
  });

  it('finds all users by certain name', done => {
    // find users named Bob
    User.find({ name: 'Bob' }).then(users => {
      assert(users[0]._id.toString() === bob._id.toString());
      done();
    });
  });

  it('finds user by ID', done => {
    // find by ID
    User.findOne({ _id: bob._id }).then(user => {
      assert(user.name === 'Bob');
      done();
    });
  });

  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'Gene');
        assert(users[1].name === 'Teddy');
        done();
      });
  });
});
