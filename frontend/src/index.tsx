import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { App } from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0e4ff",
      100: "#cbb2ff",
      200: "#a480ff",
      300: "#7a4dff",
      400: "#641bfe",
      500: "#5a01e5",
      600: "#5200b3",
      700: "#430081",
      800: "#2d004f",
      900: "#14001f",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      'html, body, #root': {
        backgroundColor: 'white', // Set root element background to white
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
