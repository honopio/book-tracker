import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#7d70a5" },
    secondary: { main: "#d8e5cd" },
    info: { main: "#6f9c68" },
    background: { default: "#fdf9f2" },
    text: { primary: "#110e03" },
  },
  typography: {
    fontFamily: "'Inter', Arial, sans-serif",
    // if h1, make it bold and bigger
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
    },
    h5: {
      fontSize: "1.5rem",
    },
  },
});

export default theme;
