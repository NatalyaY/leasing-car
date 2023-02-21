import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header/index';
import { DefaultTheme } from 'styled-components';
import Container from './components/shared/Container';


const theme: DefaultTheme = {
  pallete: {
    primary: {
      main: '#FF9514',
      light: '#FF951466',
      transparent: '#FF951433',
      pressed: '#FFA83D'
    },
    secondary: {
      main: '#575757',
      light: '#F3F3F4',
      dark: '#EAEAEB'
    },
    error: {
      main: '#D53234'
    },
    success: {
      main: '#77DE8D'
    }
  },
  radius: {
    large: '40px',
    medium: '32px',
    small: '16px'
  },
  margin: {
    xl: '48px',
    m: '36px',
    s: '20px'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
      </Container>
    </ThemeProvider>
  );
}

export default App;
