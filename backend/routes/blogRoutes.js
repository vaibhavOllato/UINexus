// /routes/blogRoutes.js

const express = require('express');
const router = express.Router();

// Import blog controller
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// Route to fetch all blogs
router.get('/blogs', getBlogs);

// Route to create a new blog (admin only)
router.post('/blogs', createBlog);

// Route to update a blog (admin only)
router.put('/blogs/:id', updateBlog);

// Route to delete a blog (admin only)
router.delete('/blogs/:id', deleteBlog);

module.exports = router;
