// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

// const AddAmountDonation = () => {
//   const [formData, setFormData] = useState({
//     accountName: '',
//     accountNumber: '',
//     amount: '',
//     position: '',
//     address: '',
//     bankName: '',
//     transactionId: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Donation Details:', formData);
//     // You can add API call here to submit data
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ textAlign: 'center', mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Add Donation Details
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {/* Account Name & Account Number */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Account Holder Name"
//                 name="accountName"
//                 value={formData.accountName}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Account Number"
//                 name="accountNumber"
//                 type="number"
//                 value={formData.accountNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>

//             {/* Amount & Position */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Amount"
//                 name="amount"
//                 type="number"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Position"
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Address & Bank Name */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Transaction ID"
//                 name="transactionId"
//                 value={formData.transactionId}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
           
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Bank Name"
//                 name="bankName"
//                 value={formData.bankName}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>

//             {/* Transaction ID (Full Width) */}
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             {/* Submit Button */}
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default AddAmountDonation;


import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const AddAmountDonation = () => {
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    amount: '',
    position: '',
    address: '',
    bankName: '',
    transactionId: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/donations/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Donation added successfully!');
        setFormData({
          accountHolderName: '',
          accountNumber: '',
          amount: '',
          position: '',
          address: '',
          bankName: '',
          transactionId: '',
        });
      } else {
        setMessage(data.message || 'Failed to add donation.');
      }
    } catch (error) {
      setMessage('Error connecting to server.');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Donation Details
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Account Number" name="accountNumber" type="number" value={formData.accountNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Position" name="position" value={formData.position} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Transaction ID" name="transactionId" value={formData.transactionId} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddAmountDonation;
