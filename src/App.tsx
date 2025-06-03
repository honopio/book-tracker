import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import BookForm from "./components/pages/BookForm.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme.tsx";
import Dashboard from "./components/pages/Dashboard";
import SingleBook from "./components/pages/SingleBook.tsx";
import BookList from "./components/pages/BookList.tsx";
import { AuthProvider } from "./auth/AuthContext";
import AuthPage from "./components/pages/AuthPage";
import { useAuth } from "./auth/AuthContext.tsx";
import HeroSection from "./components/ui/HeroSection.tsx";
import React from "react";
import { useTheme } from "./context/themeContext.tsx";

function HomeRedirect() {
  const user = useAuth();
  const isLoggedIn = Boolean(user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) return null;
  return <HeroSection />;
}

function App() {
  const { mode } = useTheme();
  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeRedirect />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
