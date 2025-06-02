import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import theme from "../../theme";

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
    }}
  >
    <Typography variant="h2" component="h1" gutterBottom>
      Track Your Reading Journey
    </Typography>
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
    >
      Organize your books and track your progress with ease. Join our community
      of readers today!
    </Typography>
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
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
  </Paper>
);

export default HeroSection;
