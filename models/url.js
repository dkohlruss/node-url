const mongoose = require('mongoose');

const Url = mongoose.model('Url', {
  long_url: {
    type: String,
    required: true,
    trim: true
  },
  short_url: {
    type: String,
    trim: true
  },
  stub: {
    type: Number,
    required: true
  }
});

module.exports = {
  Url
};
