import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import theme from "../../theme";
import books from "../../assets/books.png";

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
      display: "flex",
    }}
  >
    <Box
      sx={{
        flex: 1,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Track Your Reading Journey
      </Typography>
      <Typography
        variant="h2"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: "600px" }}
      >
        Never lose track of your reading list again. Start your personal book
        tracker today!
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          component={NavLink}
          to="/login"
          sx={{ px: 4 }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={NavLink}
          to="/dashboard"
          sx={{ px: 4 }}
        >
          Explore Demo
        </Button>
      </Box>
    </Box>
    <Box
      sx={{
        flex: 1,
        display: "flex",
      }}
    >
      <img
        src={books}
        alt="Books"
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          margin: "0 auto",
        }}
      />
    </Box>
  </Paper>
);

export default HeroSection;
