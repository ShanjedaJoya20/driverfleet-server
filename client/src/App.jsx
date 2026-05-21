import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreCars from './pages/ExploreCars';
import CarDetails from './pages/CarDetails';
import AddCar from './pages/AddCar';
import MyAddedCars from './pages/MyAddedCars';
import UpdateCar from './pages/UpdateCar';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cars" element={<ExploreCars />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/add-car" element={<PrivateRoute><AddCar /></PrivateRoute>} />
                <Route path="/my-cars" element={<PrivateRoute><MyAddedCars /></PrivateRoute>} />
                <Route path="/update-car/:id" element={<PrivateRoute><UpdateCar /></PrivateRoute>} />
                <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white',
                duration: 3000,
              }}
            />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
