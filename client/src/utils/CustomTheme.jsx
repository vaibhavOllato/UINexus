import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
      primary: {
        main: "#347474",
      },
      secondary: {
        main: "#d32f2f",
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
      },
      body1: {
        fontSize: '1rem',
      },
    },
  });
  
  export default theme;
  