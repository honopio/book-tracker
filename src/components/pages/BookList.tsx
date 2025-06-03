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
  Grid,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import { Add, GridView, Sort, ViewList } from "@mui/icons-material";
import { Link } from "react-router-dom";
import BookCard from "../ui/BookCard";
import { useBooks } from "../../hooks/useBooks";
import { useAuth } from "../../auth/AuthContext";

const BookList = () => {
  const user = useAuth();
  const books = useBooks(!!user);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  // Filter books based on selected tab, search term, and sort order
  const filteredBooks = books
    .filter((book) => {
      if (selectedTab === "all") return true;
      if (selectedTab === "want-to-read") return book.status === "want-to-read";
      if (selectedTab === "reading") return book.status === "reading";
      if (selectedTab === "finished") return book.status === "finished";
      return false;
    })
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "progress":
          return (b.progress || 0) - (a.progress || 0);
        case "recent":
        default:
          return 0;
      }
    });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h1"
        component="h1"
        sx={{ mb: 4, textAlign: "center" }}
      >
        My Books
      </Typography>

      {/* Search and View Toggle */}
      <Box sx={{ mb: 4 }}>
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
            <IconButton
              onClick={(e) => setSortMenuAnchor(e.currentTarget)}
              color={sortBy !== "recent" ? "primary" : "default"}
            >
              <Sort />
            </IconButton>
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
        sx={{ mb: 3 }}
      >
        <Tab label="All Books" value="all" />
        <Tab label="Want to Read" value="want-to-read" />
        <Tab label="Currently Reading" value="reading" />
        <Tab label="Finished" value="finished" />
      </Tabs>

      {!user && (
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Alert severity="info" sx={{ fontSize: "1.25rem", py: 2 }}>
            This is a demo with sample books. You can{" "}
            <Link to="/login" style={{ color: "inherit" }}>
              log in or sign up
            </Link>{" "}
            to manage your books
          </Alert>
        </Box>
      )}

      {/* Books Display */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="text.secondary">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={book.id}>
              <BookCard key={book.id} book={book} viewMode={viewMode} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} viewMode={viewMode} />
          ))}
        </Box>
      )}

      {/* Sort Menu */}
      <Menu
        anchorEl={sortMenuAnchor}
        open={Boolean(sortMenuAnchor)}
        onClose={() => setSortMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            setSortBy("recent");
            setSortMenuAnchor(null);
          }}
        >
          Recently Added
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("title");
            setSortMenuAnchor(null);
          }}
        >
          Title (A-Z)
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("author");
            setSortMenuAnchor(null);
          }}
        >
          Author (A-Z)
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("rating");
            setSortMenuAnchor(null);
          }}
        >
          Highest Rated
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("progress");
            setSortMenuAnchor(null);
          }}
        >
          Most Progress
        </MenuItem>
      </Menu>
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
