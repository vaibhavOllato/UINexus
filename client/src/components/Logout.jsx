import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
  } from "@mui/material";
  import LogoutIcon from "@mui/icons-material/Logout";
  import { useTheme } from "@mui/material/styles";


  const LogoutModal = ({ open, onClose, onConfirm }) => {
    const theme = useTheme();
    return (
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "15px",
            
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <LogoutIcon sx={{ fontSize: 50, color: theme.palette.primary.main}} />
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }}>
            Confirm Logout
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ color: "gray" }}>
              Are you sure you want to logout? You will be redirected to the login
              page.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", mt: 2,  gap: 4 }}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                backgroundColor: "#e3e3e3",
                color: "black",
                "&:hover": { backgroundColor: "#e3e3e3" },
                
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover":  theme.palette.primary.light,
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  };
  
  export default LogoutModal;
  
