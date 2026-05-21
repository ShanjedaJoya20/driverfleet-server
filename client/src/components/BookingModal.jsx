import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function BookingModal({ car, onClose }) {
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      await API.post('/bookings', { carId: car._id, driverNeeded, specialNote });
      toast.success('Car booked successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book {car.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">${car.dailyRentPrice}/day</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Driver Needed</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setDriverNeeded(true)}
                className={`px-4 py-2 rounded-lg font-medium transition ${driverNeeded ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Yes (+$15/day)
              </button>
              <button
                type="button"
                onClick={() => setDriverNeeded(false)}
                className={`px-4 py-2 rounded-lg font-medium transition ${!driverNeeded ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                No
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Note</label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={3}
              placeholder="Any special requests..."
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total: <span className="font-bold text-lg text-blue-600 dark:text-blue-400">${car.dailyRentPrice + (driverNeeded ? 15 : 0)}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold transition"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
