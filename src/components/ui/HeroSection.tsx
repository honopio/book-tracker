import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import books from "../../assets/books.png";

// Hero section component
const HeroSection: React.FC = () => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      borderRadius: 2,
      textAlign: "center",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
    }}
  >
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: { md: "flex-end", xs: "center" },

        pb: { xs: 4, md: 0 },
      }}
    >
      <Box
        component="img"
        src={books}
        alt="Books"
        sx={{
          width: "100%",
          maxWidth: { xs: "350px", md: "500px" },
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
    <Box
      sx={{
        flex: 1,
        textAlign: { xs: "center", md: "left" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pl: { lg: 10, md: 5, xs: 0 },
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem", xl: "4rem" },
          fontWeight: 700,
        }}
        maxWidth={800}
      >
        Track Your Reading Journey
      </Typography>
      <Typography
        component="h3"
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: "600px",
          fontSize: { xs: "1rem", sm: "1.2rem", lg: "1.5rem", xl: "1.8rem" },
          mx: { xs: "auto", md: 0 },
        }}
      >
        Never lose track of your reading list again. Start your personal book
        tracker today!
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          component={NavLink}
          to="/login"
          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="success"
          component={NavLink}
          to="/dashboard"
          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
        >
          Explore Demo
        </Button>
      </Box>
    </Box>
  </Paper>
);

export default HeroSection;
