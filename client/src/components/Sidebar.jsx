import React, { useState } from "react";
// import "../styles/sidebar.css";
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
import { FaUserFriends, FaCog, FaNewspaper } from "react-icons/fa";
import LogoutModal from "../components/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { MdArrowDropDown } from "react-icons/md";
import { Dashboard } from "@mui/icons-material";
import { GiTwoCoins, GiPerson } from "react-icons/gi";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const theme = useTheme();
  const drawerWidth = 230;
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMemberList = () => {
    setMemberListOpen(!memberListOpen);
  };

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  // Active and inactive styles now use theme values for text colors.
  const activeStyles = {
    backgroundColor: theme.palette.primary.main,
    borderRight: `4px solid ${theme.palette.primary.nav}`,
    // Use the theme's contrast text for the primary color for good readability
    color: theme.palette.getContrastText(theme.palette.primary.main),
  };

  const inactiveStyles = {
    backgroundColor: theme.palette.primary.light,
    borderRight: "none",
    // Use the theme's default text color
    color: theme.palette.text.primary,
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
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.text.primary,
            },
          }),
          ...(!open && {
            width: 40,
            "& .MuiDrawer-paper": {
              width: 50,
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.text.primary,
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
            sx={isActive("/dashboard") ? activeStyles : inactiveStyles}
          >
            <ListItemIcon className="sidebar-item-icon">
              <Dashboard />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Dashboard" className="sidebar-item-text" />
            )}
          </ListItem>

          {/* Member List Item with Dropdown */}
          <ListItem
            button
            onClick={toggleMemberList}
            className="sidebar-item"
            // sx={
            //   isActive("/member") ||
            //   isActive("/committee") ||
            //   (memberListOpen && location.pathname.includes("member"))
            //     ? activeStyles
            //     : inactiveStyles
            // }
          >
            <ListItemIcon className="sidebar-item-icon">
              <FaUserFriends />
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

          {/* Member List Dropdown */}
          {memberListOpen && (
            <List>
              <ListItem
                button
                className="sidebar-item"
                component={Link}
                to="/all-mmebers"
                sx={isActive("/all-mmebers") ? activeStyles : inactiveStyles}
              >
                <ListItemIcon>
                  <GiTwoCoins />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="All members"
                    className="sidebar-item-text"
                  />
                )}
              </ListItem>

              <ListItem
                button
                className="sidebar-item"
                component={Link}
                to="/committee"
                sx={isActive("/committee") ? activeStyles : inactiveStyles}
              >
                <ListItemIcon>
                  <GiPerson />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Committee Member"
                    className="sidebar-item-text"
                  />
                )}
              </ListItem>

              <ListItem
                button
                className="sidebar-item"
                component={Link}
                to="/member"
                sx={isActive("/member") ? activeStyles : inactiveStyles}
              >
                <ListItemIcon>
                  <GiTwoCoins />
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
            button
            className="sidebar-item"
            component={Link}
            to="/account-dashboard"
            sx={isActive("/account-dashboard") ? activeStyles : inactiveStyles}
          >
            <ListItemIcon className="sidebar-item-icon">
              <FaCog />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Accounts" className="sidebar-item-text" />
            )}
          </ListItem>

          {/* Blogs Item */}
          <ListItem
            button
            className="sidebar-item"
            component={Link}
            to="/blog-create"
            sx={isActive("/blog-create") ? activeStyles : inactiveStyles}
          >
            <ListItemIcon className="sidebar-item-icon">
              <FaNewspaper />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Blogs" className="sidebar-item-text" />
            )}
          </ListItem>

          <hr />

          {/* Logout Item */}
          <ListItem button onClick={handleOpenDialog} sx={inactiveStyles}>
            <ListItemIcon>
              <LogoutIcon />
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
              backgroundColor: theme.palette.primary.main,
              color:theme.palette.background.default,
              borderRadius: "50%",
              padding: "8px",
              width: "48px",
              height: "48px",
              transition: "transform 0.3s ease-in-out",
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              "&:hover": {
                backgroundColor: "#ECECEC",
                color:theme.palette.primary.main,
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
