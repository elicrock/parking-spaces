const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    maxPlaces: { type: Number, required: true },
    locationType: {
      type: String,
      enum: ['Линейное', 'Площадное'],
      required: true,
    },
    ownership: {
      type: String,
      enum: ['Муниципальное', 'Частное'],
      required: true,
    },
    availability: {
      type: String,
      enum: ['Платное', 'Бесплатное', 'Условно бесплатное'],
      required: true,
    },
    schedule: {
      type: String,
      required() {
        return this.availability === 'Условно бесплатное';
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('parkingSpace', parkingSpaceSchema);
