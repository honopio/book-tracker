import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  Tabs,
  Tab,
  Fab,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Rating,
  Grid,
} from "@mui/material";
import { Add, GridView, ViewList } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Fetch books from db
import { useBooks } from "./Dashboard";

const BookList = () => {
  const books = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState("all");

  const statusConfig = {
    "want-to-read": { label: "Want to Read", color: "success" as const },
    reading: { label: "Currently Reading", color: "secondary" as const },
    finished: { label: "Finished", color: "primary" as const },
  };

  // Filter books based on selected tab
  const filteredBooks = books.filter((book) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "want-to-read") return book.status === "want-to-read";
    if (selectedTab === "reading") return book.status === "reading";
    if (selectedTab === "finished") return book.status === "finished";
    return false;
  });

  //bookcard
  const BookCard = ({ book }) => (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            by {book.author}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={statusConfig[book.status].label}
            color={statusConfig[book.status].color}
            size="small"
            sx={{ mb: 1 }}
          />
        </Box>

        {book.status !== "want-to-read" && book.pageCount && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {book.currentPage}/{book.pageCount} pages
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(book.currentPage / book.pageCount) * 100}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        {book.rating && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating value={book.rating} readOnly size="small" />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {book.rating}/5
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h1"
        component="h1"
        sx={{ mb: 4, textAlign: "center" }}
      >
        My Books
      </Typography>

      {/* Controls */}
      <Box sx={{ mb: 4 }}>
        {/* Search and View Toggle */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            {!isMobile && (
              <>
                <IconButton
                  onClick={() => setViewMode("grid")}
                  color={viewMode === "grid" ? "primary" : "default"}
                >
                  <GridView />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode("list")}
                  color={viewMode === "list" ? "primary" : "default"}
                >
                  <ViewList />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All Books" value="all" />
        <Tab label="Want to Read" value="want-to-read" />
        <Tab label="Currently Reading" value="reading" />
        <Tab label="Finished" value="finished" />
      </Tabs>

      {/* Books Display */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="text.secondary">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      <Link to="/add-book">
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          aria-label="add book"
        >
          <Add />
        </Fab>
      </Link>
    </Container>
  );
};

export default BookList;
