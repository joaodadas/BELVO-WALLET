import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#05070A',
      paper: '#101418',
    },
    primary: {
      main: '#2979ff',
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
  },
  shape: {
    borderRadius: 4,
  },
});
