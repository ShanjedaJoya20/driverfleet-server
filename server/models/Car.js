const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dailyRentPrice: { type: Number, required: true },
  carType: { type: String, required: true, enum: ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Sports', 'Electric', 'Convertible', 'Truck'] },
  imageURL: { type: String, required: true },
  seatCapacity: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  description: { type: String, required: true },
  availability: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Car', carSchema);
