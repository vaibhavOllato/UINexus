import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateBlog from "./CreateBlog"; // Import your CreateBlog component

// Helper component for rendering tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`blog-tabpanel-${index}`}
      aria-labelledby={`blog-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const BlogTabs = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for editing a blog
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    image_url: "",
    author_name: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fetch blogs when the "All Blogs" tab is active
  useEffect(() => {
    if (value === 0) {
      setLoading(true);
      axios
        .get("http://localhost:5000/api/blogs")
        .then((response) => {
          setBlogs(response.data);
          setError("");
        })
        .catch((error) => {
          setError("Error fetching blogs");
          console.error("Error fetching blogs:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [value]);

  // Handle delete action
  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:5000/api/blogs/${blogId}`)
        .then((response) => {
          // Remove the deleted blog from the state
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    }
  };

  // Open edit dialog
  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setEditData({
      title: blog.title,
      description: blog.description,
      image_url: blog.image_url,
      author_name: blog.author_name,
    });
  };

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Submit the edit form
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditLoading(true);
    axios
      .put(`http://localhost:5000/api/blogs/${editingBlog.id}`, editData)
      .then((response) => {
        // Update the blog in the list
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === editingBlog.id ? { ...blog, ...editData } : blog
          )
        );
        setEditingBlog(null);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  // Close the edit dialog
  const handleEditCancel = () => {
    setEditingBlog(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          mb: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="blog tabs"
          textColor="inherit"
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              fontWeight: 600,
            },
            "& .MuiTabs-indicator": {
              height: "4px",
            },
          }}
        >
          <Tab label="All Blogs" id="blog-tab-0" aria-controls="blog-tabpanel-0" />
          <Tab label="Create Blog" id="blog-tab-1" aria-controls="blog-tabpanel-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          blogs.map((blog) => (
            <Card
              key={blog.id}
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: 2,
                position: "relative",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.01)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="div" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Box>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(blog)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(blog.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {blog.description}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Author: {blog.author_name}
                </Typography>
                {blog.image_url && (
                  <Box mt={2}>
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      style={{ width: "100%", borderRadius: "4px" }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateBlog />
      </TabPanel>

      {/* Edit Blog Dialog */}
      <Dialog open={Boolean(editingBlog)} onClose={handleEditCancel} fullWidth maxWidth="sm">
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleEditSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              label="Title"
              name="title"
              fullWidth
              value={editData.title}
              onChange={handleEditChange}
              required
            />
            <TextField
              margin="normal"
              label="Description"
              name="description"
              fullWidth
              value={editData.description}
              onChange={handleEditChange}
              multiline
              rows={4}
              required
            />
            <TextField
              margin="normal"
              label="Image URL"
              name="image_url"
              fullWidth
              value={editData.image_url}
              onChange={handleEditChange}
            />
            <TextField
              margin="normal"
              label="Author Name"
              name="author_name"
              fullWidth
              value={editData.author_name}
              onChange={handleEditChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary" disabled={editLoading}>
            {editLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogTabs;
