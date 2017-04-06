var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicianSchema = new Schema({
  fullname: { type: String, required: true },
  zipcode: { type: Number, required: true },
  genre: { type: String, required: true },
  instrument: { type: String, required: true },
  experience: { type: Number, required: true },
  email: { type: String, required: true },
});

musicianSchema.pre('save', function (next) {
  next();
});

var Musician = mongoose.model('Musician', musicianSchema);

module.exports = Musician;
