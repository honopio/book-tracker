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
  textColor,
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
        width: "clamp(150px, 22vw, 200px)", // min 120px, max 200px, fluid in between
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

        <Typography variant="caption" sx={{ mb: 3 }}>
          {author}
        </Typography>

        {/* Progress bar for currently reading and finished */}
        {(progress > 0 || status === "finished") && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {/* Book icon on the left */}
            <MenuBook sx={{ mr: 1, color: textColor }} />

            {/* Progress bar */}
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={status === "finished" ? 100 : progress}
                sx={{
                  backgroundColor: "#eee",
                  "& .MuiLinearProgress-bar": { backgroundColor: textColor },
                }}
              />
              {currentPage && pageCount && (
                <Typography variant="caption">
                  {status === "finished"
                    ? "Finished!"
                    : `Page ${currentPage} of ${pageCount}`}
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
              sx={{ mb: 0.5, color: textColor }}
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
            onClick={status === "finished" ? undefined : handleMenuOpen}
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
