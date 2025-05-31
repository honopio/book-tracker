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
