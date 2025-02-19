import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  Box,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CommitteeMember = () => {
  const theme = useTheme();
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch committee members when the component mounts
  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/person/committee-members"
        );
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
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography variant="h5">Committee Members</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="committee members table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              }}
            >
              {" "}
              {/* Dark header color */}
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Sr. No.
              </TableCell>{" "}
              {/* Added Sr. No. column */}
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Position
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Phone
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Location
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Gender
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {committeeMembers.map((member, index) => (
              <TableRow
                key={member.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5", // Hover effect on rows
                  },
                }}
              >
                <TableCell align="center">{index + 1}</TableCell>{" "}
                {/* Serial Number */}
                <TableCell align="center">
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell align="center">{member.position}</TableCell>
                <TableCell align="center">{member.phone}</TableCell>
                <TableCell align="center">{member.place}</TableCell>
                <TableCell align="center">{member.email}</TableCell>
                <TableCell align="center">{member.gender}</TableCell>{" "}
                {/* Displaying Gender */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommitteeMember;
