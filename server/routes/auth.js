const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const createToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, photoURL, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const user = new User({ name, email, photoURL, password, provider: 'email' });
    await user.save();
    res.status(201).json({ message: 'Registration successful. Please login.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.password) {
      return res.status(400).json({ message: 'This account uses Google login. Please use Google sign in.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    createToken(user, res);
    res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL } });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Login failed' });
  }
});

router.post('/google', async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, photoURL, provider: 'google' });
      await user.save();
    }
    createToken(user, res);
    res.json({ message: 'Google login successful', user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL } });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Google login failed' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
