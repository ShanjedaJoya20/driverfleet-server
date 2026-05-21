require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Car = require('./models/Car');
const User = require('./models/User');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const { MongoClient, ServerApiVersion } = require('mongodb');

const cars = [
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
  { name: 'Audi R8', dailyRentPrice: 249, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600', seatCapacity: 2, pickupLocation: 'Beverly Hills, CA', description: 'V10 supercar with Quattro all-wheel drive and stunning design.', availability: true },
  { name: 'Chevrolet Suburban', dailyRentPrice: 110, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', seatCapacity: 8, pickupLocation: 'Houston, TX', description: 'Full-size SUV with massive cargo space and powerful V8 engine.', availability: true },
  { name: 'Nissan Altima', dailyRentPrice: 42, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600', seatCapacity: 5, pickupLocation: 'Atlanta, GA', description: 'Comfortable sedan with excellent fuel economy and ProPILOT assist.', availability: true },
  { name: 'Lamborghini Huracan', dailyRentPrice: 399, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600', seatCapacity: 2, pickupLocation: 'Miami, FL', description: 'V10 Italian exotic with 631hp and head-turning design.', availability: true },
  { name: 'Hyundai Tucson', dailyRentPrice: 48, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600', seatCapacity: 5, pickupLocation: 'Phoenix, AZ', description: 'Stylish compact SUV with smart tech and generous warranty.', availability: true },
  { name: 'Chevrolet Corvette', dailyRentPrice: 159, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 2, pickupLocation: 'Detroit, MI', description: 'Mid-engine American icon with 495hp and track-focused performance.', availability: true },
  { name: 'Volkswagen Golf GTI', dailyRentPrice: 65, carType: 'Hatchback', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 5, pickupLocation: 'Boston, MA', description: 'Hot hatch with turbocharged performance and premium interior.', availability: true },
  { name: 'Bentley Continental GT', dailyRentPrice: 299, carType: 'Luxury', imageURL: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600', seatCapacity: 4, pickupLocation: 'New York, NY', description: 'British grand tourer with W12 engine and handcrafted luxury.', availability: true },
  { name: 'Ford Explorer', dailyRentPrice: 68, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600', seatCapacity: 7, pickupLocation: 'Washington, DC', description: 'Family SUV with three-row seating and advanced safety features.', availability: true },
  { name: 'Mazda MX-5 Miata', dailyRentPrice: 59, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 2, pickupLocation: 'San Diego, CA', description: 'Lightweight roadster with perfect balance and open-top fun.', availability: true },
  { name: 'Tesla Model X', dailyRentPrice: 139, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1532970134575-d0e7c2bb1ced?w=600', seatCapacity: 7, pickupLocation: 'San Jose, CA', description: 'Electric SUV with falcon-wing doors and Ludicrous mode.', availability: true },
  { name: 'BMW 3 Series', dailyRentPrice: 62, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600', seatCapacity: 5, pickupLocation: 'Philadelphia, PA', description: 'Ultimate driving machine with sharp handling and premium cabin.', availability: true },
  { name: 'Ram 1500', dailyRentPrice: 85, carType: 'Truck', imageURL: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', seatCapacity: 5, pickupLocation: 'Nashville, TN', description: 'Full-size pickup with powerful towing capacity and luxurious interior.', availability: true },
  { name: 'Ferrari SF90 Stradale', dailyRentPrice: 599, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600', seatCapacity: 2, pickupLocation: 'Monte Carlo, Monaco', description: 'Hybrid V8 supercar with 986hp and Formula 1 derived technology.', availability: false },
  { name: 'Kia Soul', dailyRentPrice: 35, carType: 'Hatchback', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 5, pickupLocation: 'Austin, TX', description: 'Quirky compact with tons of personality and great value.', availability: true },
  { name: 'Rolls-Royce Ghost', dailyRentPrice: 499, carType: 'Luxury', imageURL: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600', seatCapacity: 5, pickupLocation: 'Dubai, UAE', description: 'Ultimate luxury sedan with V12 engine and starlight headliner.', availability: true },
  { name: 'Subaru Outback', dailyRentPrice: 52, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=600', seatCapacity: 5, pickupLocation: 'Portland, OR', description: 'Adventure wagon with standard all-wheel drive and rugged capability.', availability: true },
  { name: 'McLaren 720S', dailyRentPrice: 449, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600', seatCapacity: 2, pickupLocation: 'London, UK', description: 'British supercar with 710hp twin-turbo V8 and dihedral doors.', availability: false },
  { name: 'Toyota RAV4', dailyRentPrice: 50, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600', seatCapacity: 5, pickupLocation: 'Charlotte, NC', description: 'Best-selling compact SUV with hybrid option and rugged styling.', availability: true },
  { name: 'Aston Martin DB11', dailyRentPrice: 329, carType: 'Luxury', imageURL: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600', seatCapacity: 4, pickupLocation: 'Geneva, Switzerland', description: 'British grand tourer with hand-built V12 and elegant design.', availability: true },
  { name: 'Honda Civic', dailyRentPrice: 38, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600', seatCapacity: 5, pickupLocation: 'Columbus, OH', description: 'Reliable and fun-to-drive compact sedan with great MPG.', availability: true },
  { name: 'Ford F-150', dailyRentPrice: 79, carType: 'Truck', imageURL: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', seatCapacity: 5, pickupLocation: 'Dallas, TX', description: 'America-s best-selling truck with Pro Power Onboard generator.', availability: true },
  { name: 'Polestar 2', dailyRentPrice: 79, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1532970134575-d0e7c2bb1ced?w=600', seatCapacity: 5, pickupLocation: 'Stockholm, Sweden', description: 'Electric performance sedan with Google built-in and minimalist design.', availability: true },
  { name: 'Maserati Levante', dailyRentPrice: 139, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600', seatCapacity: 5, pickupLocation: 'Rome, Italy', description: 'Italian luxury SUV with Ferrari-derived V6 and unmistakable exhaust note.', availability: true },
  { name: 'Mini Cooper S', dailyRentPrice: 49, carType: 'Hatchback', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 4, pickupLocation: 'London, UK', description: 'Iconic British hatchback with go-kart handling and retro style.', availability: true },
  { name: 'Jaguar F-Type', dailyRentPrice: 149, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600', seatCapacity: 2, pickupLocation: 'Paris, France', description: 'British roadster with supercharged V8 and roaring exhaust.', availability: true },
  { name: 'GMC Yukon Denali', dailyRentPrice: 119, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', seatCapacity: 8, pickupLocation: 'Atlanta, GA', description: 'Full-size luxury SUV with premium Denali trim and powerful V8.', availability: true },
  { name: 'Hyundai Ioniq 6', dailyRentPrice: 69, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1532970134575-d0e7c2bb1ced?w=600', seatCapacity: 5, pickupLocation: 'Seoul, South Korea', description: 'Streamlined electric sedan with ultra-fast charging and range.', availability: true },
  { name: 'Land Rover Defender', dailyRentPrice: 99, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600', seatCapacity: 6, pickupLocation: 'Edinburgh, UK', description: 'Legendary off-roader reimagined with modern luxury and capability.', availability: true },
  { name: 'Alfa Romeo Giulia', dailyRentPrice: 72, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600', seatCapacity: 5, pickupLocation: 'Milan, Italy', description: 'Italian sports sedan with sublime handling and Ferrari-inspired DNA.', availability: true },
  { name: 'Rivian R1S', dailyRentPrice: 129, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600', seatCapacity: 7, pickupLocation: 'Boulder, CO', description: 'Electric adventure SUV with quad-motor drive and off-road capability.', availability: true },
  { name: 'Bugatti Chiron', dailyRentPrice: 999, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600', seatCapacity: 2, pickupLocation: 'Monaco', description: '8.0L quad-turbo W16 hypercar with 1500hp and top speed over 260mph.', availability: false },
  { name: 'Nissan Leaf', dailyRentPrice: 36, carType: 'Hatchback', imageURL: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', seatCapacity: 5, pickupLocation: 'San Francisco, CA', description: 'Affordable electric hatchback perfect for daily commuting.', availability: true },
  { name: 'Dodge Challenger SRT', dailyRentPrice: 109, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600', seatCapacity: 5, pickupLocation: 'Detroit, MI', description: 'American muscle coupe with supercharged V8 and 797hp.', availability: true },
  { name: 'Mercedes-Benz G-Class', dailyRentPrice: 189, carType: 'Luxury', imageURL: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600', seatCapacity: 5, pickupLocation: 'Munich, Germany', description: 'Iconic luxury off-roader with boxy design and handcrafted interior.', availability: true },
  { name: 'Honda Odyssey', dailyRentPrice: 65, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600', seatCapacity: 8, pickupLocation: 'Orlando, FL', description: 'Family minivan with built-in vacuum, entertainment system, and magic slide seats.', availability: true },
  { name: 'Lucid Air', dailyRentPrice: 149, carType: 'Sedan', imageURL: 'https://images.unsplash.com/photo-1532970134575-d0e7c2bb1ced?w=600', seatCapacity: 5, pickupLocation: 'Newark, CA', description: 'Luxury electric sedan with 500+ mile range and executive rear seats.', availability: true },
  { name: 'Ford Bronco', dailyRentPrice: 89, carType: 'SUV', imageURL: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=600', seatCapacity: 4, pickupLocation: 'Austin, TX', description: 'Reborn off-road icon with removable doors and roof.', availability: true },
  { name: 'Tesla Cybertruck', dailyRentPrice: 159, carType: 'Truck', imageURL: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', seatCapacity: 6, pickupLocation: 'Austin, TX', description: 'Armor-plated electric pickup with exoskeleton design and insane acceleration.', availability: true },
  { name: 'BMW M4 Competition', dailyRentPrice: 135, carType: 'Sports', imageURL: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600', seatCapacity: 4, pickupLocation: 'Munich, Germany', description: 'High-performance coupe with 503hp twin-turbo inline-6 and M xDrive.', availability: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    console.log('Connected to MongoDB');

    let owner = await User.findOne({ email: 'admin@drivefleet.com' });
    if (!owner) {
      owner = await User.create({
        name: 'Admin',
        email: 'admin@drivefleet.com',
        photoURL: '',
        provider: 'email',
      });
      console.log('Created default admin user');
    }

    await Car.deleteMany({});
    const carDocs = cars.map((c) => ({ ...c, owner: owner._id }));
    await Car.insertMany(carDocs);
    console.log(`Seeded ${cars.length} cars successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
