import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/CustomToast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";


const Login = () => {

  const theme = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate(); // hook to navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log("Login response:", response);

      if (response.data.message === "Login successful") {
        setError(null); // Clear any previous errors

        // Store the token and user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // On successful login, navigate to the dashboard
        navigate("/dashboard");
      } else {
        showToast.error(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      showToast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#ffffff",
        }}
      >
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
                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                sx={{ marginBottom: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ fontSize: "1.5rem" }} // Adjust icon size
                      >
                        {showPassword ? "🙈" : "👁️"}{" "}
                        {/* Use emojis for visibility toggle */}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": theme.palette.primary.light,
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>

            {/* Register Button */}
            <Grid item xs={12} sx={{ marginTop: 2 }}>
  <Button
    variant="outlined"
    fullWidth
    onClick={() => navigate("/register")}
    sx={{
      "&:hover": { backgroundColor: "#f1f1f1" },
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
