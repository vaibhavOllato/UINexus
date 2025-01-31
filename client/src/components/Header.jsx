// import React from "react";
// import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";

// const Header = () => {

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         className="header"
//         sx={{
//           backgroundColor: "#347474",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//         }}
//       >
//         <Toolbar className="toolbar">
//           {/* Logo Section */}
//           {/* <img src={LOGO} alt="Logo" className="logo-image" /> */}
//           {/* Title Section (Center Text) */}
//           <Typography variant="h5" className="title">
//             Ollato Admin Panel
//           </Typography>
//           {/* Profile Icon Section */}
//           <Box className="profile">
//             <Typography variant="body1" className="username">
//             Admin
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };
// export default Header;


import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <>
      <AppBar
        position="fixed"
        className="header"
        sx={{
          backgroundColor: "#347474",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar className="toolbar" sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo and Company Name Section (Left Side) */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" className="title" sx={{ fontWeight: "bold" }}>
                Admin Panel
            </Typography>
          </Box>
          
          {/* Profile Section (Right Side) */}
          <Box className="profile" sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" className="username" sx={{ fontWeight: "bold" }}>
               {user ? user.firstName : "Member"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
