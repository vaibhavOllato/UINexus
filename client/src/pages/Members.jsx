import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { Person, Edit, Delete } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";


const MembersTable = () => {
   const theme = useTheme();
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    email: '',
    place: '',
    position: ''
  });

  // Fetch committee members when the component mounts
  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/person/member-persons');
        setCommitteeMembers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommitteeMembers();
  }, []);

  // Handle Edit button click
  const handleEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      gender: member.gender,
      phone: member.phone,
      email: member.email,
      place: member.place,
      position: member.position
    });
    setOpenModal(true);
  };

  // Handle Modal Close
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/person/update-user', {
        userId: selectedMember.pratishtanID,  // Use pratishtanID for update
        ...formData
      });

      // Handle successful update (e.g., show a success message or refresh the table)
      console.log(response.data.message);
      setOpenModal(false);
    } catch (err) {
      console.error('Error updating user:', err);
      // Handle the error (show an alert or message)
    }
  };

  // Handle Delete button click - Opens the confirmation modal
  const handleDelete = (member) => {
    setSelectedMember(member); // Set the member to be deleted
    setDeleteModalOpen(true); // Open the delete confirmation modal
  };

  // Confirm Deletion
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/person/delete-user/${selectedMember.pratishtanID}`);
      // After successful deletion, close the modal and remove the user from the state
      setCommitteeMembers(committeeMembers.filter(member => member.pratishtanID !== selectedMember.pratishtanID));
      setDeleteModalOpen(false);
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user');
    }
  };

  // Handle Cancel Delete
  const handleCancelDelete = () => {
    setDeleteModalOpen(false); // Close the modal without deleting
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box p={1}>
    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
      <Typography variant="h4" gutterBottom>
        Members
      </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="members table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white, }}
              >
                Sr No.
              </TableCell>
              {/* <TableCell
                sx={{ backgroundColor: '#424242', color: '#fff', fontWeight: 'bold' }}
              >
                Avatar
              </TableCell> */}
              <TableCell
                sx={{ backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white, }}
              >
                Name
              </TableCell>
                 <TableCell
                sx={{ backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white, }}
              >
                Gender
              </TableCell>
              <TableCell
                sx={{backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white, }}
              >
                Position
              </TableCell>
              <TableCell
                sx={{backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,}}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{ backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white, }}
              >
                Place
              </TableCell>
              <TableCell
                sx={{ backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,}}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white, }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {committeeMembers.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell align="center">{index + 1}</TableCell>
                
                <TableCell>
                  <Typography variant="body1">
                    {member.firstName} {member.lastName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.gender}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.position}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.place}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.email}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(member)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(member)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
  
    </Box>

  );
};

export default MembersTable;

