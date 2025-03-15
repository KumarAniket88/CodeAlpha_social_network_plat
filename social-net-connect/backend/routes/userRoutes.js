const express = require('express');
const { getUserProfile, updateUserProfile, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get the profile of the logged-in user (protected)
router.get('/profile', protect, getUserProfile);

// Route to update user profile (protected)
router.put('/profile', protect, updateUserProfile);

// Route to get all users (for search functionality)
router.get('/', getAllUsers);

module.exports = router;

