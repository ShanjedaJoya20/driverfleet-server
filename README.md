# DriveFleet - Car Rental Platform

**Live Site URL:** [https://drivefleet-car-rental.netlify.app](https://drivefleet-car-rental.netlify.app)

## Features

- **Browse & Explore Cars** - View a curated fleet of vehicles with detailed specs, pricing, and availability status.
- **User Authentication** - Secure login/registration with email/password and Google OAuth, protected by JWT HTTP-only cookies.
- **Full CRUD for Car Listings** - Users can add, update, and delete their own car listings with a clean form interface.
- **Booking System** - Logged-in users can book cars with optional driver service, special notes, and real-time price calculation.
- **Search & Filter** - Search cars by name using MongoDB regex and filter by car type (SUV, Sedan, Luxury, etc.).
- **Dark Mode & Animations** - Toggle between light/dark themes with smooth Framer Motion page transitions.
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop with a modern, recruiter-friendly UI.
- **Booking Counter** - Each car tracks its booking count using MongoDB's `$inc` operator.
- **My Bookings & My Cars Dashboards** - Dedicated pages for users to manage their reservations and listings.
- **Custom 404 & Loading States** - Friendly error page and loading spinner for smooth UX.

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Router, React Hot Toast, Firebase Auth  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, Cookie-Parser  
**Deployment:** Netlify (Client), Render (Server)
