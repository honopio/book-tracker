import { ChevronLeft } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
      <Button
        startIcon={<ChevronLeft />}
        color="primary"
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </Box>
  );
};

export default BackButton;
