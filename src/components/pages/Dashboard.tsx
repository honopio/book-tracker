import React from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Fab,
  Tooltip,
  Alert,
  Fade,
  Button,
  Paper,
} from "@mui/material";
import BookCarousel from "../ui/BookCarousel";
import type { Book } from "../../types";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import theme from "../../theme";
import { NavLink, useLocation } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import { demoBooks } from "../../data/demoData";
import { useAuth } from "../../auth/AuthContext";

// Updated useBooks hook to handle auth state
export function useBooks(isLoggedIn: boolean) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Return demo data for logged-out users
      setBooks(demoBooks);
      return;
    }

    async function fetchBooks() {
      // Fetch * from book_user table and join with titles and authors from books table
      const { data, error } = await supabase.from("book_user").select(`
          *,
          books (
            title,
            author
          )
        `);
      console.log("Fetched books:", data, error);
      if (!error && data) {
        // Flatten and map DB fields to Book props
        const merged = data.map((row: any) => ({
          title: row.books?.title,
          author: row.books?.author,
          id: row.id,
          status: row.status,
          progress: row.progress,
          rating: row.rating,
          createdAt: row.created_at,
          currentPage: row.current_page,
          pageCount: row.page_count,
        }));
        merged.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBooks(merged as Book[]);
      }
    }
    fetchBooks();
  }, [isLoggedIn]);

  return books;
}

// Hero section component
const HeroSection: React.FC = () => (
  <Paper
    elevation={0}
    sx={{
      background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
      p: 6,
      mb: 4,
      borderRadius: 2,
      textAlign: "center",
    }}
  >
    <Typography variant="h2" component="h1" gutterBottom>
      Track Your Reading Journey
    </Typography>
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
    >
      Organize your books and track your progress with ease. Join our community
      of readers today!
    </Typography>
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
      <Button
        variant="contained"
        size="large"
        component={NavLink}
        to="/login"
        sx={{ px: 4 }}
      >
        Get Started
      </Button>
    </Box>
  </Paper>
);

const Dashboard: React.FC = () => {
  const isSmall = useMediaQuery("(max-width:900px)");
  const location = useLocation();
  const message = location.state?.message;
  const isLoggedIn = useAuth();

  const books = useBooks(isLoggedIn);

  // Filter books by status
  const currentlyReading = books.filter((book) => book.status === "reading");
  const wantToRead = books.filter((book) => book.status === "want-to-read");
  const finishedBooks = books.filter((book) => book.status === "finished");

  const [showSuccess, setShowSuccess] = useState(!!message);
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        px: "5%",
        py: 4,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          width: "100%",
          maxWidth: "none",
        }}
      >
        {/* hero section only for logged-out users */}
        {!isLoggedIn && <HeroSection />}

        {/* Dashboard title */}
        <Typography variant="h1" component="h1" m={8} align="center">
          {isLoggedIn ? "My reading dashboard" : "Demo dashboard"}
        </Typography>

        {/* Success message for logged-in users who added a book */}
        {message && isLoggedIn && (
          <Fade in={showSuccess} timeout={500}>
            <Alert
              color="info"
              severity="success"
              sx={{
                mb: 4,
                fontSize: "1.1rem",
                fontWeight: 500,
                py: 2,
                px: 3,
              }}
            >
              {message}
            </Alert>
          </Fade>
        )}

        {/* Demo banner for logged-out users */}
        {!isLoggedIn && (
          <Alert severity="info" sx={{ mb: 3, fontSize: "1.25rem" }}>
            This is a demo with sample books. Sign up to start tracking your own
            reading!
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            minWidth: 0,
          }}
        >
          {/* first row: currently reading */}
          <Box sx={{ width: "100%" }}>
            <BookCarousel
              books={currentlyReading}
              title="Currently Reading"
              backgroundColor={theme.palette.secondary.main}
              textColor={theme.palette.secondary.contrastText}
            />
          </Box>

          {/* Second row: want to read and finished books */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmall ? "column" : "row",
              gap: 2,
            }}
          >
            <Box sx={{ width: isSmall ? "100%" : "60%" }}>
              <BookCarousel
                books={wantToRead}
                title="Want to Read"
                backgroundColor={theme.palette.success.main}
                textColor={theme.palette.success.contrastText}
              />
            </Box>
            <Box sx={{ width: isSmall ? "100%" : "40%" }}>
              <BookCarousel
                books={finishedBooks}
                title="Finished Books"
                backgroundColor={theme.palette.primary.main}
                textColor={theme.palette.primary.contrastText}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <NavLink to="/add-book">
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Tooltip title="Add a book" arrow>
            <Fab color="primary" aria-label="add book">
              <Add />
            </Fab>
          </Tooltip>
        </Box>
      </NavLink>
    </Box>
  );
};

export default Dashboard;
