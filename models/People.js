const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});
// Create a person schema
const PersonSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  status: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  // add in geo location
  geometry: GeoSchema

});

const Person = mongoose.model('person', PersonSchema);
module.exports = Person;