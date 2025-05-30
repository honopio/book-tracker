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
} from "@mui/material";
import BookCarousel from "../ui/BookCarousel";
import type { Book } from "../../types";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import theme from "../../theme";
import { NavLink, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

// fetch books from db
function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
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
        // Flatten the result to merge book_user and books fields
        const merged = data.map((row: any) => ({
          ...row,
          title: row.books?.title,
          author: row.books?.author,
        }));
        merged.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setBooks(merged as Book[]);
      }
    }
    fetchBooks();
  }, []);

  return books;
}

const Dashboard: React.FC = () => {
  const isSmall = useMediaQuery("(max-width:900px)");
  const books = useBooks();
  const location = useLocation();
  const message = location.state?.message;

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
        <Typography variant="h1" component="h1" m={8} align="center">
          My Reading Dashboard
        </Typography>
        {message && (
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

        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: 3,
            width: "100%",
            minWidth: 0,
          }}
        >
          {/* Left column: Currently Reading + Want to Read */}
          <Box
            sx={{
              flex: isSmall ? "none" : "2",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: isSmall ? "100%" : "auto",
            }}
          >
            <BookCarousel
              books={currentlyReading}
              title="Currently Reading"
              backgroundColor={theme.palette.secondary.main}
              textColor={theme.palette.secondary.contrastText}
            />

            <BookCarousel
              books={wantToRead}
              title="Want to Read"
              backgroundColor={theme.palette.success.main}
              textColor={theme.palette.success.contrastText}
            />
          </Box>

          {/* Right column: Finished Books */}
          <Box
            sx={{
              flex: isSmall ? "none" : "1",
              minWidth: 0,
              display: "flex",
              width: isSmall ? "100%" : "auto",
              mt: isSmall ? 2 : 0,
            }}
          >
            <Box sx={{ width: "100%" }}>
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
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </NavLink>
    </Box>
  );
};

export default Dashboard;
