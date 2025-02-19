import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Grid, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material/styles";


const Register = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',  // Default value
    phone: '',
    email: '',
    password: '',
    place: '',  // Default empty
    position: '',  // Added default position value
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration Response:', response.data);
      navigate('/');  // This should redirect to the login page

      if (response.data.success) {
        setError(null);
        console.log("Navigating to login...");
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: theme.palette.primary.light }}>
      <Paper sx={{ padding: 3, width: '100%', maxWidth: 600, backgroundColor: '#ffffff' }}>
        <Typography variant="h5" gutterBottom color="primary" align="center">
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Place"
                variant="outlined"
                fullWidth
                required
                name="place"
                value={formData.place}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            {/* Position Field */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Position</InputLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  label="Position"
                >
                  <MenuItem value="Committee member">Committe member</MenuItem>
                  <MenuItem value="Members">Members</MenuItem>
                  {/* <MenuItem value="Admin">Admin</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': theme.palette.primary.light,
                }}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleLoginRedirect}
                sx={{ marginTop: 2 }}
              >
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
