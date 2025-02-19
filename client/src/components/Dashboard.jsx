// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid, CardHeader, CircularProgress } from '@mui/material';

// const Dashboard = () => {
//   const [committeeMembers, setCommitteeMembers] = useState(0);
//   const [members, setMembers] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch committee members
//   useEffect(() => {
//     const fetchCommitteeMembers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/person/committee-members');
//         const data = await response.json();
//         if (response.ok) {
//           setCommitteeMembers(data.length); // Assuming data is an array of committee members
//         } else {
//           setError('Failed to fetch committee members');
//         }
//       } catch (err) {
//         setError('Error connecting to the server');
//       }
//     };

//     const fetchMembers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/person/member-persons');
//         const data = await response.json();
//         if (response.ok) {
//           setMembers(data.length); // Assuming data is an array of members
//         } else {
//           setError('Failed to fetch members');
//         }
//       } catch (err) {
//         setError('Error connecting to the server');
//       }
//     };

//     const fetchData = async () => {
//       await fetchCommitteeMembers();
//       await fetchMembers();
//       setLoading(false); // Data fetching is complete, so we set loading to false
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
//   }

//   return (
//     <>
//       <h1>Welcome to the Rudra veer Dashboard</h1>
      
//       <Grid container spacing={1} style={{ marginTop: '10px' }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card   
//         sx={{
//           padding: '10px',
//           textAlign: 'center',
//           backgroundColor: '#D8E8E4', // Card background
//           color: '#233142', // Text color
//           cursor: 'pointer',
//           transition: '0.3s',
//           position: 'relative',
//           '&:hover': {
//             backgroundColor: '#b0e4d0', // Darker color on hover
//           },
//         }}>
//             <CardHeader title="Total Committee Members" />
//             <CardContent>
//               <Typography variant="h5" color="textSecondary">
//                 {committeeMembers}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//           sx={{
//               padding: '10px',
//               textAlign: 'center',
//               backgroundColor: '#E8D8F0', // Card background
//               color: '#233142', // Text color
//               cursor: 'pointer',
//               transition: '0.3s',
//               position: 'relative',
//               '&:hover': {
//                 backgroundColor: '#d0aad0', // Darker color on hover
//               },
//             }}>
//             <CardHeader title="Total Members" />
//             <CardContent>
//               <Typography variant="h5" color="textSecondary">
//                 {members}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       </>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress as MuiCircularProgress } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  const [committeeMembers, setCommitteeMembers] = useState(0);
  const [members, setMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dummy target values for percentage calculations (adjust as needed)
  const committeeTarget = 100;
  const membersTarget = 500;

  // Fetch data from the API
  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/person/committee-members');
        const data = await response.json();
        if (response.ok) {
          setCommitteeMembers(data.length); // Assuming data is an array
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
          setMembers(data.length); // Assuming data is an array
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
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' 
        }}
      >
        <MuiCircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          color: 'red', 
          textAlign: 'center', 
          pt: 5,
          background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', 
          minHeight: '100vh' 
        }}
      >
        {error}
      </Box>
    );
  }

  // Calculate percentages for the circular graphs (ensure you have a target or max value)
  const committeePercentage = Math.min((committeeMembers / committeeTarget) * 100, 100);
  const membersPercentage = Math.min((members / membersTarget) * 100, 100);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        p: 3,
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#233142' }}>
          Welcome to the Rudra Veer Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555', mt: 1 }}>
          Monitor your committee and member statistics at a glance
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: 3,
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#233142' }}>
                Total Committee Members
              </Typography>
              <Box sx={{ width: 150, height: 150, margin: '0 auto' }}>
                <CircularProgressbar
                  value={committeePercentage}
                  text={`${committeeMembers}`}
                  styles={buildStyles({
                    pathColor: '#57385c',
                    textColor: '#233142',
                    trailColor: '#f0f0f0',
                    textSize: '16px',
                  })}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                {committeePercentage.toFixed(0)}% of target {committeeTarget}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: 3,
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#233142' }}>
                Total Members
              </Typography>
              <Box sx={{ width: 150, height: 150, margin: '0 auto' }}>
                <CircularProgressbar
                  value={membersPercentage}
                  text={`${members}`}
                  styles={buildStyles({
                    pathColor: '#57385c',
                    textColor: '#233142',
                    trailColor: '#f0f0f0',
                    textSize: '16px',
                  })}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                {membersPercentage.toFixed(0)}% of target {membersTarget}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
