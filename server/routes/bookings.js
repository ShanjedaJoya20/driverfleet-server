const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { carId, driverNeeded, specialNote } = req.body;
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (!car.availability) return res.status(400).json({ message: 'Car is not available for booking' });

    const days = 1;
    const driverFee = driverNeeded ? 15 : 0;
    const totalPrice = (car.dailyRentPrice + driverFee) * days;

    const booking = new Booking({
      car: carId,
      user: req.user.id,
      driverNeeded: driverNeeded || false,
      specialNote: specialNote || '',
      totalPrice,
      bookingDate: new Date(),
    });
    await booking.save();

    await Car.findByIdAndUpdate(carId, { $inc: { bookingCount: 1 } });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('car')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('car')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
