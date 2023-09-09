const mongoose = require('mongoose');
// const exercise = require('./exercise');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  log: {
    type: Array,
    value: {
      description: {
        type: String,
        require: true
      },
      duration: {
        type: Number,
        require: true
      },
      date: {
        type: String
      }
    }
  }
});

module.exports = mongoose.model('user', userSchema);