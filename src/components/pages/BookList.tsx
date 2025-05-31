import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { GridView, ViewList } from "@mui/icons-material";

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

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
    </Container>
  );
};

export default BookList;
