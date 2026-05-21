import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="text-xl font-bold text-white">DriveFleet</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted platform for car rentals. Explore our fleet, book your ride, and hit the road with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Useful Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-blue-400 transition">Home</Link>
              <Link to="/cars" className="block text-sm hover:text-blue-400 transition">Explore Cars</Link>
              <Link to="/add-car" className="block text-sm hover:text-blue-400 transition">Add Car</Link>
              <Link to="/my-bookings" className="block text-sm hover:text-blue-400 transition">My Bookings</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact & Social</h3>
            <p className="text-sm text-gray-400 mb-1">info@drivefleet.com</p>
            <p className="text-sm text-gray-400 mb-1">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-400 mb-4">123 Fleet Street, New York, NY</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"><FaFacebook /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition"><svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition"><FaInstagram /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DriveFleet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
