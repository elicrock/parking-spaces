const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  maxPlaces: { type: Number, required: true },
  locationType: { type: String, enum: ['linear', 'areal'], required: true },
  ownership: { type: String, enum: ['municipal', 'private'], required: true },
  availability: {
    type: String,
    enum: ['paid', 'free', 'conditionalFree'],
    required: true,
  },
  schedule: {
    type: String,
    required() {
      return this.availability === 'conditionalFree';
    },
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('parkingSpace', parkingSpaceSchema);
