import Layout from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout></Layout>;
    </ThemeProvider>
  );
}

export default App;
