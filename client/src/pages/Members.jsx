import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import { Person, Phone, LocationOn, Email } from '@mui/icons-material'; // Importing icons

const Members = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to determine the card color based on position
  const getCardColor = (position) => {
    switch (position) {
      case 'Committee member':
        return '#f44336'; // Red
      case 'Secretary':
        return '#2196f3'; // Blue
      case 'Member':
        return '#4caf50'; // Green
      default:
        return '#D8E8E4'; // Grey
    }
  };

  // Fetch committee members when the component mounts
  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/person/member-persons');
        setCommitteeMembers(response.data); // Set the fetched data
        setLoading(false); // Set loading state to false after data is fetched
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchCommitteeMembers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1> Members</h1>
      <Grid container spacing={3}>
        {committeeMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card sx={{ backgroundColor: getCardColor(member.position), color: 'black' }}>
              <CardContent>
                {/* Centered User Icon and Name */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                  <Avatar sx={{ bgcolor: '#3f51b5', width: 60, height: 60, marginBottom: 1 }}>
                    <Person sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h6" align="center">
                    {member.firstName} {member.lastName}
                  </Typography>
                </Box>

                {/* Member's Details */}
                <Typography variant="body1" color="textSecondary" display="flex" alignItems="center">
                  <Person sx={{ marginRight: 1 }} /> Position: {member.position}
                </Typography>
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                  <Phone sx={{ marginRight: 1 }} /> Phone: {member.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                  <LocationOn sx={{ marginRight: 1 }} /> Place: {member.place}
                </Typography>
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                  <Email sx={{ marginRight: 1 }} /> Email: {member.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Members;
