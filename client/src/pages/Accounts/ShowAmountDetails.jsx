import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Button, Box } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const ShowAmountDetails = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Fetch all donation data
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donations/all-donate');
        const data = await response.json();
        if (response.ok) {
          setDonations(data); // Assuming the response is an array of donations
        } else {
          setError(data.message || 'Failed to fetch donations');
        }
      } catch (err) {
        setError('Error connecting to the server');
      }
      setLoading(false);
    };

    fetchDonations();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExcelDownload = () => {
    const ws = XLSX.utils.json_to_sheet(donations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Donations');
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
    saveAs(excelFile, 'donations.xlsx');
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>All Donation Details</Typography>
      
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<ArrowBackIcon />}
          // onClick={handleExcelDownload} 
          onClick={() => navigate("/account-dashboard")}
        >
          Back
        </Button>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleExcelDownload} 
        >
          Download as Excel
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, backgroundColor: '#f7f7f7' }}>
        <Table sx={{ borderCollapse: 'collapse', width: '100%' }}>
          <TableHead sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Account Holder Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Account Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Bank Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', border: '1px solid #ddd' }}>Transaction ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donation, index) => (
              <TableRow key={donation._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ border: '1px solid #ddd' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.accountHolderName}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.accountNumber}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.amount}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.position}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.address}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.bankName}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{donation.transactionId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={donations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ShowAmountDetails;
