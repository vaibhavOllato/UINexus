import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#57385c', // Custom primary color
      light: '#89748d', // Light variant (approximately 30% lighter)
      nav: '#ffffff',
    },
    secondary: {
      main: '#FF9800', // Custom secondary color
    },
    text: {
      primary: '#333333', // Dark text color for primary content
      secondary: '#757575', // Slightly lighter text color for secondary content
    },
    error: {
      main: '#D32F2F', // Custom error color
    },
    background: {
      default: '#F4F6F8', // Custom background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none', // Prevent uppercase in buttons
      fontWeight: 'bold',
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'collapse',
          '& .MuiTableCell-root': {
            padding: '6px 10px', // Custom padding
            border: '1px solid #ddd', // Custom border
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#347474',
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '5px 10px',
        },
      },
    },
  },
});

export default theme;
