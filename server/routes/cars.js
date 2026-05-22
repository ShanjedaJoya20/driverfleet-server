const express = require('express');
const Car = require('../models/Car');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const seedData = [
  { name: 'Tesla Model 3', dailyRentPrice: 89, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1532970134575-d0e7c2bb1ced?w=600', seatCapacity: 5, pickupLocation: 'New York, NY', description: 'Electric sedan with autopilot, premium interior, and zero emissions.', availability: true },
  { name: 'Range Rover Sport', dailyRentPrice: 120, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600', seatCapacity: 7, pickupLocation: 'Los Angeles, CA', description: 'Luxury SUV with leather seats, panoramic roof, and advanced off-road capability.', availability: true },
  { name: 'Porsche 911 Carrera', dailyRentPrice: 199, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600', seatCapacity: 2, pickupLocation: 'Miami, FL', description: '450hp twin-turbo sports car with sport exhaust and premium sound system.', availability: true },
  { name: 'Toyota Camry', dailyRentPrice: 45, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1627814065103-1a5f5b7a283f?w=600', seatCapacity: 5, pickupLocation: 'Chicago, IL', description: 'Reliable sedan with Bluetooth, backup camera, and lane assist.', availability: true },
  { name: 'Mercedes-Benz S-Class', dailyRentPrice: 159, carType: 'Luxury', imageURL: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d2?w=600', seatCapacity: 5, pickupLocation: 'San Francisco, CA', description: 'Luxury sedan with massage seats, ambient lighting, and Burmester audio.', availability: true },
  { name: 'Ford Mustang GT', dailyRentPrice: 99, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600', seatCapacity: 4, pickupLocation: 'Dallas, TX', description: '5.0L V8 American muscle car with 450hp and track-ready suspension.', availability: true },
  { name: 'Honda CR-V', dailyRentPrice: 55, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600', seatCapacity: 5, pickupLocation: 'Seattle, WA', description: 'Compact SUV with spacious interior and great fuel economy.', availability: true },
  { name: 'BMW i8', dailyRentPrice: 179, carType: 'Luxury', imageURL: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600', seatCapacity: 2, pickupLocation: 'Las Vegas, NV', description: 'Plug-in hybrid sports car with gull-wing doors and futuristic design.', availability: false },
  { name: 'Jeep Wrangler', dailyRentPrice: 75, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=600', seatCapacity: 4, pickupLocation: 'Denver, CO', description: 'Iconic 4x4 off-road vehicle with removable roof and rugged capability.', availability: true },
  { name: 'Toyota Prius', dailyRentPrice: 40, carType: 'Hatchback', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 5, pickupLocation: 'Portland, OR', description: 'Eco-friendly hybrid with exceptional fuel economy.', availability: true },
];

router.post('/seed', async (req, res) => {
  try {
    let owner = await User.findOne({ email: 'admin@drivefleet.com' });
    if (!owner) {
      owner = await User.create({ name: 'Admin', email: 'admin@drivefleet.com', photoURL: '', provider: 'email' });
    }
    await Car.deleteMany({});
    const docs = seedData.map((c) => ({ ...c, owner: owner._id }));
    await Car.insertMany(docs);
    res.json({ message: `Seeded ${docs.length} cars` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
