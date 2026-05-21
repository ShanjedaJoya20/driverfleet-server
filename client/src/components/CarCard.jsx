import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col">
      <img
        src={car.imageURL}
        alt={car.name}
        className="w-full h-52 object-cover"
        loading="lazy"
      />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{car.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${car.availability ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
            {car.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{car.carType} &bull; {car.seatCapacity} Seats</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{car.pickupLocation}</p>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
          ${car.dailyRentPrice}<span className="text-sm font-normal text-gray-500">/day</span>
        </p>
        <div className="mt-auto">
          <Link
            to={`/cars/${car._id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
