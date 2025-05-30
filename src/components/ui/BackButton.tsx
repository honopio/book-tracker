import { ChevronLeft } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BackButton: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
      <Button
        component={Link}
        to="/dashboard"
        startIcon={<ChevronLeft />}
        color="primary"
      >
        Go back to dashboard
      </Button>
    </Box>
  );
};

export default BackButton;
