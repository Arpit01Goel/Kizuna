import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from "@mui/material/styles";

import './index.css'
import App from './App.jsx'
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "inherit", // Inherit Tailwind color
          },
          "& .MuiInputLabel-root": {
            color: "inherit", // Inherit Tailwind color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit", // Inherit Tailwind border
          },
        },
      },
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider theme={theme}>
    <div data-theme="dracula">
    <App />

    </div>
    </ThemeProvider>
  </StrictMode>,
)
