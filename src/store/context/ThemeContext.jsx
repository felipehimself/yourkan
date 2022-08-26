import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function CustomTheme({ children }) {

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: '#21212d',
          },
          color: { default: '#fff' },
          primary: {
            main: '#645fc6 '
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
