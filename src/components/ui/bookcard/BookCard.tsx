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
  CardActions,
} from "@mui/material";
import { MenuBook, Delete } from "@mui/icons-material";
import { type BookCardProps } from "../../../types";

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  status,
  progress = 0,
  rating,
  pageCount,
  currentPage,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const setRating = (newValue: number | null) => {
    console.log(`Rating set to: ${newValue}`);
  };

  const getMenuItems = () => {
    if (status === "reading") {
      return [
        {
          label: "finished",
          action: () => handleStatusChange("finished"),
        },
      ];
    }
    if (status === "want-to-read") {
      return [
        {
          label: "start reading",
          action: () => handleStatusChange("reading"),
        },
      ];
    }
    return [];
  };

  const handleStatusChange = (
    newStatus: "reading" | "want-to-read" | "finished"
  ) => {
    //HANDLE STATUS CHANGE HERE
    console.log(`Status changed to: ${newStatus}`);
  };

  const handleDelete = () => {
    //HANDLE DELETE HERE
    console.log(`Book with ID ${id} deleted`);
  };

  return (
    <Card
      sx={(theme) => ({
        width: 200,
        height: 300,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.background.default}`,
      })}
    >
      {/* Book details */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Chip
            label={status.replace(/-/g, " ")}
            onClick={handleMenuOpen}
            variant="outlined"
          />
          {status !== "finished" && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {getMenuItems().map((item, idx) => (
                <MenuItem
                  key={item.label}
                  onClick={() => {
                    item.action();
                    handleMenuClose();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          )}
          <IconButton
            color="error"
            onClick={handleDelete}
            sx={{ ml: "auto" }}
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default BookCard;
