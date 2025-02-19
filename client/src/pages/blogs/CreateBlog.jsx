// import React, { useState } from "react";
// import axios from "axios";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";

// const CreateBlog = () => {
//   const [blog, setBlog] = useState({
//     title: "",
//     description: "",
//     image_url: "",
//     author_name: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setBlog({ ...blog, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/blogs", blog);
//       setMessage("Blog created successfully!");
//       setBlog({ title: "", description: "", image_url: "", author_name: "" });
//     } catch (error) {
//       setMessage("Error creating blog. Please try again.");
//       console.error("Error:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Create a New Blog
//       </Typography>
//       {message && <Typography color={message.includes("Error") ? "error" : "success"}>{message}</Typography>}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={blog.title}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           value={blog.description}
//           onChange={handleChange}
//           margin="normal"
//           required
//           multiline
//           rows={4}
//         />
//         <TextField
//           fullWidth
//           label="Image URL"
//           name="image_url"
//           value={blog.image_url}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Author Name"
//           name="author_name"
//           value={blog.author_name}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />

//         <Box mt={2}>
//           <Button type="submit" variant="contained" color="primary" disabled={loading}>
//             {loading ? "Submitting..." : "Create Blog"}
//           </Button>
//         </Box>
//       </form>
//     </Container>
//   );
// };

// export default CreateBlog;



import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image_url: "",
    author_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/blogs", blog);
      setMessage("Blog created successfully!");
      setBlog({
        title: "",
        description: "",
        image_url: "",
        author_name: "",
      });
    } catch (error) {
      setMessage("Error creating blog. Please try again.");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create a New Blog
      </Typography>
      {message && (
        <Typography color={message.includes("Error") ? "error" : "success"}>
          {message}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={blog.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={blog.description}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image_url"
          value={blog.image_url}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Author Name"
          name="author_name"
          value={blog.author_name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Submitting..." : "Create Blog"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateBlog;
