import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e',   
    },
  },
});

export default Theme;

