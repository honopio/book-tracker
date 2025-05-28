import React from "react";
import { Box, Container, Typography, Grid, useMediaQuery } from "@mui/material";
import BookCarousel from "../ui/BookCarousel";
import type { Book } from "../../types";

// Mock data - replace with your actual data source
const mockBooks: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    status: "reading",
    progress: 65,
    currentPage: 180,
    pageCount: 276,
    rating: 0,
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    status: "reading",
    progress: 30,
    currentPage: 85,
    pageCount: 256,
    rating: 0,
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    status: "finished",
    progress: 100,
    rating: 5,
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    status: "finished",
    progress: 100,
    rating: 4.5,
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "want-to-read",
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "want-to-read",
  },
  {
    id: "7",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: "want-to-read",
  },
];

const Dashboard: React.FC = () => {
  const isSmall = useMediaQuery("(max-width:900px)");

  // Filter books by status
  const currentlyReading = mockBooks.filter(
    (book) => book.status === "reading"
  );
  const wantToRead = mockBooks.filter((book) => book.status === "want-to-read");
  const finishedBooks = mockBooks.filter((book) => book.status === "finished");

  const handleSeeAllCurrentlyReading = () => {
    console.log("See all currently reading books");
    // Navigate to detailed view or open modal
  };

  const handleSeeAllWantToRead = () => {
    console.log("See all want to read books");
  };

  const handleSeeAllFinished = () => {
    console.log("See all finished books");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: "5%",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h1" component="h1" m={8} align="center">
          My Reading Dashboard
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
          }}
        >
          {/* Left column: Currently Reading + Want to Read */}
          <Grid
            sx={{
              flex: isSmall ? "unset" : 2,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <BookCarousel
              books={currentlyReading}
              title="Currently Reading"
              backgroundColor={(theme) => theme.palette.secondary.main}
              textColor={(theme) => theme.palette.secondary.contrastText}
              onSeeAll={handleSeeAllCurrentlyReading}
              maxVisibleBooks={isSmall ? 1 : 2}
            />

            <BookCarousel
              books={wantToRead}
              title="Want to Read"
              backgroundColor={(theme) => theme.palette.success.main}
              textColor={(theme) => theme.palette.success.contrastText}
              onSeeAll={handleSeeAllWantToRead}
              maxVisibleBooks={isSmall ? 1 : 2}
            />
          </Grid>

          {/* Right column: Finished Books */}
          <Grid
            sx={{
              flex: isSmall ? "unset" : 1,
              minWidth: 0,
              display: "flex",
              mt: isSmall ? 2 : 0,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <BookCarousel
                books={finishedBooks}
                title="Finished Books"
                backgroundColor={(theme) => theme.palette.primary.main}
                textColor={(theme) => theme.palette.primary.contrastText}
                onSeeAll={handleSeeAllFinished}
                maxVisibleBooks={1}
                height={isSmall ? 580 : 1180} // Taller for the right column
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
