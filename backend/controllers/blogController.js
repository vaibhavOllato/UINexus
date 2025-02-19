// /controllers/blogController.js
const db = require('../config/db');


// Fetch all blogs
const getBlogs = (req, res) => {
  db.query('SELECT * FROM blogs ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Database error:', err);  // Log the detailed error
      res.status(500).json({ message: 'Error fetching blogs' });
    } else {
      res.json(results);
    }
  });
};


// Create a new blog
const createBlog = (req, res) => {
  const { title, description, image_url, author_name } = req.body;

  const query = 'INSERT INTO blogs (title, description, image_url, author_name) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, image_url, author_name], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error creating blog' });
    } else {
      res.status(201).json({ message: 'Blog created successfully', blogId: results.insertId });
    }
  });
};

// Update a blog
const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, author_name } = req.body;

  const query = 'UPDATE blogs SET title = ?, description = ?, image_url = ?, author_name = ? WHERE id = ?';
  db.query(query, [title, description, image_url, author_name, id], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error updating blog' });
    } else {
      res.json({ message: 'Blog updated successfully' });
    }
  });
};

// Delete a blog
const deleteBlog = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM blogs WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting blog' });
    } else {
      res.json({ message: 'Blog deleted successfully' });
    }
  });
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog
};
