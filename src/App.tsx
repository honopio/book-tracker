import Layout from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout></Layout>;
    </ThemeProvider>
  );
}

export default App;
