const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify JWT and extract user role
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  });
};

// Admin Dashboard Data
router.get('/admin', authenticate, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Teacher Dashboard Data
router.get('/teacher', authenticate, (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ message: 'Forbidden' });

  res.status(200).json({ message: 'Teacher Dashboard Placeholder' });
});

// Parent Dashboard Data
router.get('/parent', authenticate, (req, res) => {
  if (req.user.role !== 'Parent') return res.status(403).json({ message: 'Forbidden' });

  res.status(200).json({ message: 'Parent Dashboard Placeholder' });
});

// Student Dashboard Data
router.get('/student', authenticate, (req, res) => {
  if (req.user.role !== 'Student') return res.status(403).json({ message: 'Forbidden' });

  res.status(200).json({ message: 'Student Dashboard Placeholder' });
});

module.exports = router;
