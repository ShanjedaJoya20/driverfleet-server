import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaShieldAlt, FaHeadset, FaCarSide, FaMoneyBillWave } from 'react-icons/fa';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/cars')
      .then(({ data }) => setCars(Array.isArray(data) ? data.filter(c => c.availability).slice(0, 6) : []))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Drive the Moment, <span className="text-yellow-300">Pay the Day</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Explore our premium fleet of cars for rent. Flexible daily rates, easy booking, and ready when you are.
            </p>
            <Link
              to="/cars"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3.5 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Explore Cars
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Available Cars</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Choose from our handpicked selection of quality vehicles.</p>
          </motion.div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          )}
          {!loading && cars.length > 0 && (
            <div className="text-center mt-10">
              <Link to="/cars" className="inline-block border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white font-semibold px-8 py-2.5 rounded-xl transition-all">
                View All Cars
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Why Drive With Us</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">We make car rental simple, affordable, and reliable.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaCarSide, title: 'Wide Selection', desc: 'From economy to luxury, find the perfect car for any occasion.' },
              { icon: FaMoneyBillWave, title: 'Best Prices', desc: 'Competitive daily rates with no hidden fees or surprises.' },
              { icon: FaShieldAlt, title: 'Fully Insured', desc: 'Every rental comes with comprehensive coverage for peace of mind.' },
              { icon: FaHeadset, title: '24/7 Support', desc: 'Our team is available around the clock to help you.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Hit the Road?</h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">Sign up today, browse our fleet, and book your first rental in minutes.</p>
            <Link to="/register" className="inline-block bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-gray-100 transition shadow-lg">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
