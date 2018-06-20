const mongoose = require('mongoose');

mongoose.connect('mongodb://lochost/users_test');
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', error => {
    console.warn(error);
  });
