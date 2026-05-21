import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteModal from '../components/DeleteModal';
import toast from 'react-hot-toast';

export default function MyAddedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCars = () => {
    API.get('/cars/my-cars/all')
      .then(({ data }) => setCars(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCars() }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`/cars/${deleteTarget}`);
      toast.success('Car deleted successfully');
      setDeleteTarget(null);
      fetchCars();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Added Cars</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your car listings.</p>
          </div>
          <Link to="/add-car" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition">
            + Add New
          </Link>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">You haven't added any cars yet.</p>
            <Link to="/add-car" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition">
              Add Your First Car
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                <img src={car.imageURL} alt={car.name} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{car.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${car.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {car.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{car.carType} &bull; {car.seatCapacity} seats</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{car.pickupLocation}</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">${car.dailyRentPrice}<span className="text-sm font-normal text-gray-500">/day</span></p>
                  <div className="mt-auto flex gap-2">
                    <Link to={`/update-car/${car._id}`}
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-sm transition">
                      Update
                    </Link>
                    <button onClick={() => setDeleteTarget(car._id)}
                      className="flex-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 font-semibold py-2 rounded-xl text-sm transition">
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {deleteTarget && <DeleteModal onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />}
    </div>
  );
}
