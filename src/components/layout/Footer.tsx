import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer: React.FC = () => (
  <AppBar
    position="static"
    component="footer"
    sx={{
      boxShadow: "none",
      borderTop: "1px solid",
      borderColor: "divider",
    }}
  >
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="inherit" align="center">
          BookTracker &copy; {new Date().getFullYear()} &mdash; Track your
          reading journey!
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Footer;
