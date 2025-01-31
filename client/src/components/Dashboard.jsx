import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardHeader, CircularProgress } from '@mui/material';

const Dashboard = () => {
  const [committeeMembers, setCommitteeMembers] = useState(0);
  const [members, setMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch committee members
  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/person/committee-members');
        const data = await response.json();
        if (response.ok) {
          setCommitteeMembers(data.length); // Assuming data is an array of committee members
        } else {
          setError('Failed to fetch committee members');
        }
      } catch (err) {
        setError('Error connecting to the server');
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/person/member-persons');
        const data = await response.json();
        if (response.ok) {
          setMembers(data.length); // Assuming data is an array of members
        } else {
          setError('Failed to fetch members');
        }
      } catch (err) {
        setError('Error connecting to the server');
      }
    };

    const fetchData = async () => {
      await fetchCommitteeMembers();
      await fetchMembers();
      setLoading(false); // Data fetching is complete, so we set loading to false
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Welcome to the Rudra veer Dashboard</h1>
      
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card 
        sx={{
          padding: '10px',
          textAlign: 'center',
          backgroundColor: '#D8E8E4', // Card background
          color: '#233142', // Text color
          cursor: 'pointer',
          transition: '0.3s',
          position: 'relative',
          '&:hover': {
            backgroundColor: '#b0e4d0', // Darker color on hover
          },
        }}>
            <CardHeader title="Total Committee Members" />
            <CardContent>
              <Typography variant="h5" color="textSecondary">
                {committeeMembers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card 
          sx={{
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#E8D8F0', // Card background
              color: '#233142', // Text color
              cursor: 'pointer',
              transition: '0.3s',
              position: 'relative',
              '&:hover': {
                backgroundColor: '#d0aad0', // Darker color on hover
              },
            }}>
            <CardHeader title="Total Members" />
            <CardContent>
              <Typography variant="h5" color="textSecondary">
                {members}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
