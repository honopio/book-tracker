import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6f9c68", contrastText: "#d8e5cd" }, // dark green
    success: { main: "#ab86cb", contrastText: "#f8f2ff" }, // purple
    secondary: { main: "#d8e5cd", contrastText: "#6f9c68" }, // light green
    info: { main: "#6f9c68", contrastText: "#d8e5cd" }, // dark green
    background: { default: "#fdf9f2", paper: "#fdf9f2" }, // light beige
    text: { primary: "#2d260c", secondary: "#83897e" }, // black, gray
  },
  typography: {
    fontFamily: "'Inter', Arial, sans-serif",
    // if h1, make it bold and bigger
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1rem",
    },
  },
});

export default theme;
