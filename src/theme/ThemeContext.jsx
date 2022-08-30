import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CustomTheme = ({ children }) => {

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: '#21212d',
          },

          primary: {
            main: '#645fc6 ',
          },

          secondary: {
            main: 'rgba(255,255,255,0.6)',
          },

          text: {
            primary: '#fff',
          },
  

        },
        

      }),
    []
  );

  return (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
}

export default CustomTheme
