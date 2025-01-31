import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

const SearchDonationByNmae = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!accountHolderName) {
      setError('Please enter an account holder name.');
      return;
    }

    setLoading(true);
    setError('');
    setDonation(null);

    try {
      const response = await fetch(`http://localhost:5000/api/donations/${accountHolderName}`);
      const data = await response.json();

      if (response.ok) {
        setDonation(data);
      } else {
        setError(data.message || 'Donation not found');
      }
    } catch (err) {
      setError('Error fetching donation data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Search Donation by Account Holder Name</Typography>
      
      <TextField
        label="Account Holder Name"
        variant="outlined"
        fullWidth
        value={accountHolderName}
        onChange={(e) => setAccountHolderName(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: '20px' }}
      >
        Search
      </Button>

      {loading && <CircularProgress />}

      {error && <Typography variant="h6" color="error">{error}</Typography>}

      {donation && !loading && !error && (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">Donation Details:</Typography>
          <Typography><strong>Account Holder Name:</strong> {donation.accountHolderName}</Typography>
          <Typography><strong>Account Number:</strong> {donation.accountNumber}</Typography>
          <Typography><strong>Amount:</strong> {donation.amount}</Typography>
          <Typography><strong>Position:</strong> {donation.position}</Typography>
          <Typography><strong>Address:</strong> {donation.address}</Typography>
          <Typography><strong>Bank Name:</strong> {donation.bankName}</Typography>
          <Typography><strong>Transaction ID:</strong> {donation.transactionId}</Typography>
        </Paper>
      )}
    </div>
  );
};

export default SearchDonationByNmae;
