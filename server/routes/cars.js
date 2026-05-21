const express = require('express');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (type && type !== 'All') {
      query.carType = type;
    }
    const cars = await Car.find(query).populate('owner', 'name email photoURL').sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner', 'name email photoURL');
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, dailyRentPrice, carType, imageURL, seatCapacity, pickupLocation, description, availability } = req.body;
    const car = new Car({
      name, dailyRentPrice, carType, imageURL, seatCapacity, pickupLocation, description,
      availability: availability ?? true,
      owner: req.user.id,
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this car' });
    }
    const { name, dailyRentPrice, carType, imageURL, seatCapacity, pickupLocation, description, availability } = req.body;
    if (name !== undefined) car.name = name;
    if (dailyRentPrice !== undefined) car.dailyRentPrice = dailyRentPrice;
    if (carType !== undefined) car.carType = carType;
    if (imageURL !== undefined) car.imageURL = imageURL;
    if (seatCapacity !== undefined) car.seatCapacity = seatCapacity;
    if (pickupLocation !== undefined) car.pickupLocation = pickupLocation;
    if (description !== undefined) car.description = description;
    if (availability !== undefined) car.availability = availability;
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this car' });
    }
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my-cars/all', authMiddleware, async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
