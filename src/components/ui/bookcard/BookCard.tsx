import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { MenuBook } from "@mui/icons-material";
import { type BookCardProps } from "./BookCard.types";

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  status,
  progress = 0,
  rating,
  dateFinished,
  pageCount,
  currentPage,
  onStatusChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const setRating = (newValue: number) => {
    console.log(`Rating set to: ${newValue}`);
  };

  const handleStatusChange = (
    newStatus: "reading" | "want-to-read" | "finished"
  ) => {
    handleMenuClose();
    onStatusChange?.(newStatus);
    console.log(`Status changed to: ${newStatus}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <Card
      sx={{
        width: 200,
        height: 480,
        transition: "all 0.2s ease-in-out",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
    >
      {/* Book details */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Typography variant="h4" noWrap>
          {title}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mb: 3 }}>
          {author}
        </Typography>

        {/* Progress bar for currently reading */}
        {progress > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {/* Book icon on the left */}
            <MenuBook sx={{ mr: 1, color: "info.main" }} />
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                color="info"
              />
              {currentPage && pageCount && (
                <Typography variant="caption" color="info.main">
                  Page {currentPage} of {pageCount}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Rating for finished books */}
        {status !== "want-to-read" && (
          <Box sx={{ mb: 1 }}>
            <Rating
              value={rating ? rating : 0}
              size="medium"
              precision={0.5}
              sx={{ mb: 0.5, color: "info.main" }}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
        )}

        <Chip
          size="small"
          label={status.replace(/-/g, " ")}
          onClick={handleMenuOpen}
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
};

export default BookCard;
