import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import BookForm from "./components/pages/BookForm.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme.tsx";
import Dashboard from "./components/pages/Dashboard";
import SingleBook from "./components/pages/SingleBook.tsx";
import BookList from "./components/pages/BookList.tsx";
import { AuthProvider } from "./auth/AuthContext";
import AuthPage from "./components/pages/AuthPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="book/:id" element={<SingleBook />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="library" element={<BookList />} />
            <Route path="add-book" element={<BookForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
