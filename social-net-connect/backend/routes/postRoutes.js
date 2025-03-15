const express = require('express');
const { createPost, getPosts, getPostById, deletePost, likePost, commentOnPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new post (protected)
router.post('/', protect, createPost);

// Route to get all posts
router.get('/', getPosts);

// Route to get a single post by ID
router.get('/:id', getPostById);

// Route to delete a post (protected)
router.delete('/:id', protect, deletePost);

// Route to like a post (protected)
router.put('/:id/like', protect, likePost);

// Route to comment on a post (protected)
router.post('/:id/comment', protect, commentOnPost);

module.exports = router;

