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
  },
});

export default theme;
