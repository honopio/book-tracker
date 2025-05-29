import Layout from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme.tsx";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout></Layout>;
    </ThemeProvider>
  );
}

export default App;
