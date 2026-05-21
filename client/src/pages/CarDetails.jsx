import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import toast from 'react-hot-toast';

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    API.get(`/cars/${id}`)
      .then(({ data }) => setCar(data))
      .catch(() => toast.error('Car not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!car) return <div className="text-center py-20 text-gray-500">Car not found</div>;

  const handleBookClick = () => {
    if (!user) {
      toast.error('Please login to book a car');
      navigate('/login');
      return;
    }
    if (!car.availability) {
      toast.error('This car is currently unavailable');
      return;
    }
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <img src={car.imageURL} alt={car.name} className="w-full h-64 sm:h-80 md:h-96 object-cover" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{car.carType} &bull; {car.seatCapacity} Seats &bull; {car.pickupLocation}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold self-start ${
                car.availability ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              }`}>
                {car.availability ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              ${car.dailyRentPrice}<span className="text-base font-normal text-gray-500">/day</span>
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{car.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Type', value: car.carType },
                { label: 'Seats', value: car.seatCapacity },
                { label: 'Location', value: car.pickupLocation },
                { label: 'Bookings', value: car.bookingCount },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleBookClick}
              disabled={!car.availability}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition shadow-lg"
            >
              {car.availability ? 'Book Now' : 'Unavailable'}
            </button>
          </div>
        </motion.div>
      </div>
      {showBooking && <BookingModal car={car} onClose={() => setShowBooking(false)} />}
    </div>
  );
}
