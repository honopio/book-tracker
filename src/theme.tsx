import { createTheme } from "@mui/material/styles";

const colors = {
  darkGreen: "#6b8d66",
  lightGreen: "#d8e5cd",
  purple: "#9e69c1",
  purpleUnderline: "#cab4dc",
  lightPurple: "#e9dff5",
  darkPurple: "#6b4c7a",
  darkBrown: "#2d260c",
  lightBeige: "#fdf9f2",
  gray: "#83897e",
  darkBackground: "#1b1b1b",
  darkModePrimaryGreen: "#9bb897",
  darkModeSecondaryGreen: "#40552d",
  darkModeText: "#e0d3cb",
};

const lightTheme = createTheme({
  palette: {
    primary: { main: colors.darkGreen, contrastText: colors.lightGreen },
    success: {
      main: colors.purple,
      light: colors.lightPurple,
      contrastText: colors.lightPurple,
    },
    secondary: { main: colors.lightGreen, contrastText: colors.darkGreen },
    info: { main: colors.darkGreen, contrastText: colors.lightGreen },
    background: { default: colors.lightBeige, paper: colors.lightBeige },
    text: { primary: colors.darkBrown, secondary: colors.gray },
  },
  typography: {
    fontFamily: "'Inter', Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
      display: "inline-block",
      background: `linear-gradient(180deg, transparent 65%, ${colors.purpleUnderline} 65%, ${colors.purpleUnderline} 90%)`,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      display: "inline-block",
      background: `linear-gradient(180deg, transparent 65%, ${colors.purpleUnderline} 65%, ${colors.purpleUnderline} 90%)`,
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.darkModePrimaryGreen,
      contrastText: colors.darkBrown,
    },
    success: {
      main: colors.darkPurple,
      light: colors.lightPurple,
      contrastText: colors.lightPurple,
    },
    secondary: {
      main: colors.darkModeSecondaryGreen,
      contrastText: colors.darkModeText,
    },
    info: { main: colors.lightGreen, contrastText: colors.darkGreen },
    background: {
      default: colors.darkBackground,
      paper: colors.darkBackground,
    },
    text: { primary: colors.darkModeText, secondary: colors.gray },
  },
  typography: {
    fontFamily: "'Inter', Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
      display: "inline-block",
      background: `linear-gradient(180deg, transparent 65%, ${colors.darkPurple} 65%, ${colors.darkPurple} 90%)`,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      display: "inline-block",
      background: `linear-gradient(180deg, transparent 65%, ${colors.darkPurple} 65%, ${colors.darkPurple} 90%)`,
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

export { lightTheme, darkTheme };
