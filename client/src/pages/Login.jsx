// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, Button, Grid, Box, Paper, Typography, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // hook to navigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", formData);
//       console.log("Login response:", response);
  
//       if (response.data.message === "Login successful") {
//         setError(null); // Clear any previous errors
  
//         // Store the token and user data in localStorage
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
  
//         // On successful login, navigate to the dashboard
//         navigate("/dashboard");
//       } else {
//         setError(response.data.message || "Invalid credentials");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
//       <Paper sx={{ padding: 3, width: '100%', maxWidth: 600, backgroundColor: '#ffffff' }}>
//         <Typography variant="h5" gutterBottom color="primary" align="center">
//           Login
//         </Typography>

//         {error && <Alert severity="error">{error}</Alert>}

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 required
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 label="Password"
//                 variant="outlined"
//                 fullWidth
//                 required
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type="password"
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 type="submit"
//                 disabled={loading}
//                 sx={{
//                   backgroundColor: '#3f51b5',
//                   '&:hover': { backgroundColor: '#303f9f' },
//                 }}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box, Paper, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/CustomToast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // hook to navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login response:", response);
  
      if (response.data.message === "Login successful") {
        setError(null); // Clear any previous errors
  
        // Store the token and user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // On successful login, navigate to the dashboard
        navigate("/dashboard");
      } else {
        // setError(response.data.message || "Invalid credentials");
        showToast.error(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      // setError(err.response?.data?.message || "Login failed. Please try again.");
      showToast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper sx={{ padding: 3, width: '100%', maxWidth: 400, backgroundColor: '#ffffff' }}>
        <Typography variant="h5" gutterBottom color="primary" align="center">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: '#3f51b5',
                  '&:hover': { backgroundColor: '#303f9f' },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>

            {/* Register Button */}
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button
                variant="text"
                fullWidth
                onClick={() => navigate("/register")} // Navigate to Register page
                sx={{
                  color: 'main',
                  '&:hover': { backgroundColor: '#f1f1f1' },
                }}
              >
                Don't have an account? Register here
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
