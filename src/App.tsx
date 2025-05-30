import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import BookForm from "./components/pages/BookForm.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme.tsx";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="add-book" element={<BookForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
