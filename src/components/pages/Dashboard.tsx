import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import BookCarousel from "../ui/BookCarousel";
import type { Book } from "../../types";
import { useEffect, useState } from "react";
import { supabase } from "../../App";
import theme from "../../theme";

// fetch books from db
function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from("book_user").select("*");
      console.log("Fetched books:", data, error);
      if (!error && data) setBooks(data as Book[]);
      setLoading(false);
    }
    fetchBooks();
  }, []);

  return { books, loading };
}

const Dashboard: React.FC = () => {
  const isSmall = useMediaQuery("(max-width:900px)");
  const { books, loading } = useBooks();

  // Filter books by status
  const currentlyReading = books.filter((book) => book.status === "reading");
  const wantToRead = books.filter((book) => book.status === "want-to-read");
  const finishedBooks = books.filter((book) => book.status === "finished");

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
              maxVisibleBooks={isSmall ? 1 : 2}
            />

            <BookCarousel
              books={wantToRead}
              title="Want to Read"
              backgroundColor={theme.palette.success.main}
              textColor={theme.palette.success.contrastText}
              maxVisibleBooks={isSmall ? 1 : 2}
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
                maxVisibleBooks={1}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
