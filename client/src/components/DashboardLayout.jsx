import { useState } from "react";
import {
  AppBar,

  CssBaseline,

  Box,
//   ThemeProvider,
//   createTheme,
 
} from "@mui/material";

import { useNavigate } from "react-router-dom";
// import "../styles/dashboardLayout.css"
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 200;



const DashboardLayout = ({ children }) => {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);




  return (
    // <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            ...(open && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }),
          }}
        >
          <Header />
          {/* header  */}
          {/* <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ marginRight: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="title">
              Admin Dashboard Expert Management
            </Typography>
          </Toolbar> */}
        </AppBar>
        {/* Drawer */}

        {/* Sidebar */}
        <Sidebar/>
        {/* <Drawer
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
              },
            }),
            ...(!open && {
              width: 40,
              "& .MuiDrawer-paper": {
                width: 50,
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
          <List>
            <ListItem button onClick={() => navigate("/dashboard")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItem>
            <ListItem button onClick={() => navigate("/settings")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Settings" />}
            </ListItem>
            <ListItem button onClick={() => navigate("/expertManagement")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Expert Management" />}
            </ListItem>
            <ListItem button onClick={handleOpenDialog}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItem>
          </List>
        </Drawer> */}

        {/* Logout Confirmation Dialog */}
        {/* <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>
            Confirm Logout
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to log out?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={confirmLogout} color="primary">
              Logout
            </Button>
          </DialogActions>
        </Dialog> */}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            marginLeft: open ? 0 : "20px", // No left margin when the drawer is open
            marginTop: "64px", // AppBar height
            marginRight: 0, // Set right margin to 0
          }}
        >
          {children}
        </Box>
      </Box>
    // </ThemeProvider>
  );
};

export default DashboardLayout;
