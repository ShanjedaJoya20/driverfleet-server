import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/bookings/my')
      .then(({ data }) => setBookings(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">All your car rental bookings in one place.</p>

          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No bookings yet.</p>
              <Link to="/cars" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition">
                Explore Cars
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col sm:flex-row gap-4 items-start">
                  {booking.car && (
                    <img src={booking.car.imageURL} alt={booking.car.name} className="w-full sm:w-32 h-24 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{booking.car?.name || 'Car removed'}</h3>
                    {booking.car && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.car.carType} &bull; {booking.car.seatCapacity} seats</p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Booked on: {new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {booking.specialNote && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Note: {booking.specialNote}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${booking.totalPrice}</span>
                      {booking.driverNeeded && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Driver Included</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
