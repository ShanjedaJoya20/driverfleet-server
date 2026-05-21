import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiMoon, FiSun, FiLogOut, FiMenu, FiX, FiUser, FiPlusCircle, FiBookOpen, FiTruck } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [dropdown, setDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdown(false);
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = user
    ? [
        { to: '/', label: 'Home' },
        { to: '/cars', label: 'Explore Cars' },
        { to: '/add-car', label: 'Add Car' },
        { to: '/my-bookings', label: 'My Bookings' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/cars', label: 'Explore Cars' },
      ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DF</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">DriveFleet</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-blue-500" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                </button>
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <Link to="/add-car" onClick={() => setDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FiPlusCircle /> Add Car
                    </Link>
                    <Link to="/my-bookings" onClick={() => setDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FiBookOpen /> My Bookings
                    </Link>
                    <Link to="/my-cars" onClick={() => setDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FiTruck /> My Added Cars
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">{user.name?.charAt(0)}</div>
                )}
                {user.name}
              </div>
              <Link to="/my-cars" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">My Added Cars</Link>
              <button onClick={handleLogout} className="block text-sm text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
