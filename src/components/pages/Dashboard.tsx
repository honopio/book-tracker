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
import { useEffect, useState } from "react";
import theme from "../../theme";
import { NavLink, useLocation } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import { useAuth } from "../../auth/AuthContext";
import { useBooks } from "../../hooks/useBooks";
import { LoggedOffAlert } from "../ui/LoggedOffAlert";

const Dashboard: React.FC = () => {
  const isSmall = useMediaQuery("(max-width:900px)");
  const location = useLocation();
  const message = location.state?.message;
  const user = useAuth();
  const isLoggedIn = !!user;

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
        {/* Dashboard title */}
        <Typography
          variant={isSmall ? "h2" : "h1"}
          component="h1"
          align="center"
          sx={{ mb: 4 }}
        >
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
          <Box sx={{ my: 4, textAlign: "center" }}>
            <LoggedOffAlert />
          </Box>
        )}

        {/* Main content area */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            minWidth: 0,
            height: "100%",
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
