const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
process.env.MONGODB_URI = 'mongodb://localhost:27017/UrlShortener';
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
