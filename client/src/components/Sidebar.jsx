import { React, useState } from "react";
import "../styles/sidebar.css";
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FaUserFriends, FaCog } from "react-icons/fa"; // Importing icons for Member List and Accounts
import LogoutModal from "../components/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout"; // Importing the Logout Icon
import { MdArrowDropDown } from "react-icons/md"; // Importing dropdown icon
import { Link } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import { GiTwoCoins, GiPerson } from "react-icons/gi"; // Importing icons for Member and Committee Member

const Sidebar = () => {
  const drawerWidth = 250;
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false); // State to manage dropdown visibility
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Define the handleOpenDialog function to open the dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Define the handleCloseDialog function to close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle toggle for Member List dropdown
  const toggleMemberList = () => {
    setMemberListOpen(!memberListOpen);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 10,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          ...(open && {
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#D8E8E4",
              color: "black",
            },
          }),
          ...(!open && {
            width: 40,
            "& .MuiDrawer-paper": {
              width: 50,
              backgroundColor: "#D8E8E4",
              color: "black",
            },
          }),
        }}
        PaperProps={{
          sx: {
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
          },
        }}
      >
        <Toolbar />
        <br />
        <List>
          {/* Dashboard Item */}
          <ListItem
            button
            className="sidebar-item"
            component={Link}
            to="/dashboard"
          >
            <ListItemIcon className="sidebar-item-icon">
              <Dashboard /> {/* Add the Dashboard icon */}
            </ListItemIcon>
            {open && (
              <ListItemText primary="Dashboard" className="sidebar-item-text" />
            )}
          </ListItem>

          {/* Member List Item with Dropdown */}
          <ListItem button onClick={toggleMemberList} className="sidebar-item">
            <ListItemIcon className="sidebar-item-icon">
              <FaUserFriends /> {/* Icon for Member List */}
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Member List"
                className="sidebar-item-text"
              />
            )}
            {/* Dropdown Icon */}
            <IconButton onClick={toggleMemberList} edge="end">
              <MdArrowDropDown />
            </IconButton>
          </ListItem>

          {/* Member List Dropdown in Sidebar */}
          {memberListOpen && (
            <List>
              <ListItem
                button
                className="sidebar-item"
                component={Link}
                to="/committee"
              >
                <ListItemIcon>
                  <GiPerson /> {/* Icon for Committee Member */}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Committee Member"
                    className="sidebar-item-text"
                  />
                )}
              </ListItem>

              {/* Member Persons Link */}
              <ListItem
                button
                className="sidebar-item"
                component={Link}
                to="/member"
              >
                <ListItemIcon>
                  <GiTwoCoins /> {/* Icon for Member */}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Member Persons"
                    className="sidebar-item-text"
                  />
                )}
              </ListItem>
            </List>
          )}

          {/* Accounts Item */}
          <ListItem
            button="true"
            className="sidebar-item"
            component={Link}
            to="/account-dashboard"
          >
            <ListItemIcon className="sidebar-item-icon">
              <FaCog /> {/* Icon for Accounts */}
            </ListItemIcon>
            {open && (
              <ListItemText primary="Accounts" className="sidebar-item-text" />
            )}
          </ListItem>

          <hr />

          {/* Logout Item */}
          <ListItem button onClick={handleOpenDialog}>
            <ListItemIcon>
              <LogoutIcon /> {/* Logout Icon */}
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItem>

          {/* Sidebar Collapse Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#347474",
              borderRadius: "50%",
              padding: "8px",
              width: "48px",
              height: "48px",
              transition: "transform 0.3s ease-in-out",
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              "&:hover": {
                backgroundColor: "#ECECEC",
              },
            }}
          >
            <TbLayoutSidebarLeftCollapse />
          </IconButton>
        </List>
      </Drawer>

      {/* Logout Dialog */}
      <LogoutModal
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
