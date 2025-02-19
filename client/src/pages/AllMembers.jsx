import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { CSVLink } from "react-csv"; // Import CSVLink for downloading CSV
import { useTheme } from "@mui/material/styles";

const AllMembers = () => {
  const theme = useTheme();
  const [membersData, setMembersData] = useState([]); // Combined data for committee and identified members
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch committee and identified members data
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const committeeResponse = await axios.get(
        "http://localhost:5000/api/person/committee-members"
      );
      const identifiedResponse = await axios.get(
        "http://localhost:5000/api/person/member-persons"
      );

      // Combine both data sets into one array
      const allMembers = [
        ...committeeResponse.data,
        ...identifiedResponse.data,
      ];

      setMembersData(allMembers); // Store the combined data
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  const headers = [
    { label: "Sr No", key: "srNo" },
    { label: "Name", key: "name" },
    { label: "Position", key: "position" },
    { label: "Phone", key: "phone" },
    { label: "Location", key: "location" },
    { label: "Email", key: "email" },
  ];

  const csvData = membersData.map((member, index) => ({
    srNo: index + 1,
    name: `${member.firstName} ${member.lastName}`,
    position: member.position || "N/A",
    phone: member.phone,
    location: member.place,
    email: member.email,
  }));

  return (
    <Box>
      {/* Header and CSV Download Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography variant="h5">All Members</Typography>
        <CSVLink data={csvData} headers={headers} filename="members.csv">
          <Button variant="contained" color="primary" startIcon={<Download />}>
            Download CSV
          </Button>
        </CSVLink>
      </Box>

      {/* Table for displaying all members */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
              align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Sr No
              </TableCell>
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
                Gender
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
            </TableRow>
          </TableHead>
          <TableBody>
            {membersData.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell align="center">{member.gender}</TableCell>
                <TableCell align="center">{member.position || "N/A"}</TableCell>
                <TableCell align="center">{member.phone}</TableCell>
                <TableCell align="center">{member.place}</TableCell>
                <TableCell align="center">{member.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllMembers;
