// import React from 'react';
// import { Card, CardContent, Typography, Grid } from '@mui/material';
// import { AccountBalance, AddCircle } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const AccountDashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//      <h2> Account Dashboard</h2>
//     <Grid container spacing={3} sx={{ padding: 3 }}>
//       {/* Add Account Card */}
//       <Grid item xs={12} md={6}>
//         <Card 
//           sx={{ backgroundColor: '#f5f5f5', padding: 2, cursor: 'pointer' }}
//           onClick={() => navigate('/add-account')}
//         >
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               <AddCircle sx={{ marginRight: 1 }} /> Add Donation Amount
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Account Details Card */}
//       <Grid item xs={12} md={6}>
//         <Card 
//           sx={{ backgroundColor: '#e3f2fd', padding: 2, cursor: 'pointer' }}
//           onClick={() => navigate('/show-account')}
//         >
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               <AccountBalance sx={{ marginRight: 1 }} /> Account Details
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Account Details Card */}
//       <Grid item xs={12} md={6}>
//         <Card 
//           sx={{ backgroundColor: '#f5f5f5', padding: 2, cursor: 'pointer' }}
//           onClick={() => navigate('/search-account')}
//         >
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               <AccountBalance sx={{ marginRight: 1 }} /> Search by name 
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//     </Grid>
//     </div>

//   );
// };

// export default AccountDashboard;


import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { AccountBalance, AddCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccountDashboard = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch total donation amount
  useEffect(() => {
    const fetchTotalDonationAmount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donations/all-donate');
        const data = await response.json();
        if (response.ok) {
          const total = data.reduce((acc, donation) => acc + parseFloat(donation.amount), 0);
          setTotalAmount(total);
        } else {
          console.error('Failed to fetch donations');
        }
      } catch (err) {
        console.error('Error connecting to the server', err);
      }
      setLoading(false);
    };

    fetchTotalDonationAmount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Account Dashboard</h2>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Total Donation Amount Card */}
        <Grid item xs={12} >
          <Card sx={{ backgroundColor: '#fdc57b', padding: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Donation Amount
              </Typography>
              <Typography variant="h6" color="textSecondary">
              ₹{totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Add Donation Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ backgroundColor: '#D8E8E4', padding: 2, cursor: 'pointer' }}
            onClick={() => navigate('/add-account')}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <AddCircle sx={{ marginRight: 1 }} /> Add  Amount
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Details Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ backgroundColor: '#E8D8F0', padding: 2, cursor: 'pointer' }}
            onClick={() => navigate('/show-account')}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <AccountBalance sx={{ marginRight: 1 }} />All Account Details
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Search by Name Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ backgroundColor: '#D8E8E4', padding: 2, cursor: 'pointer' }}
            onClick={() => navigate('/search-account')}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <AccountBalance sx={{ marginRight: 1 }} /> Search by Name
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountDashboard;
