import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
} from "@mui/material";
import { PlayArrow, Check, BookmarkBorder } from "@mui/icons-material";
import { type BookCardProps } from "./BookCard.types";

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover,
  status,
  progress = 0,
  rating,
  dateFinished,
  pageCount,
  currentPage,
  onClick,
  onStatusChange,
  showControls = true,
  compact = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [imageError, setImageError] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (
    newStatus: "reading" | "want-to-read" | "finished"
  ) => {
    handleMenuClose();
    onStatusChange?.(newStatus);
    console.log(`Status changed to: ${newStatus}`);
  };

  const handleImageError = () => {
    setImageError(true);
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
        width: compact ? 140 : 200,
        height: compact ? 180 : 280,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease-in-out",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: onClick ? "translateY(-4px)" : "none",
          boxShadow: onClick ? "0 8px 25px rgba(0,0,0,0.15)" : "none",
        },
      }}
    >
      {/* Status indicator */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 1,
        }}
      ></Box>

      {/* Controls menu */}
      {showControls && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={() => handleStatusChange("reading")}>
              <PlayArrow fontSize="small" sx={{ mr: 1 }} />
              Currently Reading
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("want-to-read")}>
              <BookmarkBorder fontSize="small" sx={{ mr: 1 }} />
              Want to Read
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("finished")}>
              <Check fontSize="small" sx={{ mr: 1 }} />
              Finished
            </MenuItem>
          </Menu>
        </Box>
      )}

      {/* Book cover */}
      <Box
        sx={{
          position: "relative",
          height: compact ? 100 : 160,
          overflow: "hidden",
        }}
      >
        {!imageError ? (
          <CardMedia
            component="img"
            image={cover}
            alt={`${title} cover`}
            onError={handleImageError}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: compact ? 32 : 48,
                height: compact ? 32 : 48,
              }}
            >
              📚
            </Avatar>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              sx={{ px: 1 }}
            >
              No Cover
            </Typography>
          </Box>
        )}
      </Box>

      {/* Book details */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: compact ? 1 : 2,
          "&:last-child": {
            pb: compact ? 1 : 2,
          },
        }}
      >
        <Typography
          variant={compact ? "caption" : "subtitle2"}
          component="h3"
          sx={{
            fontWeight: 600,
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: compact ? 2 : 2,
            WebkitBoxOrient: "vertical",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 1,
          }}
        >
          {author}
        </Typography>

        {/* Progress bar for currently reading */}
        {status === "reading" && progress > 0 && (
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: "rgba(0,0,0,0.1)",
                "& .MuiLinearProgress-bar": {},
              }}
            />
            {currentPage && pageCount && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Page {currentPage} of {pageCount}
              </Typography>
            )}
          </Box>
        )}

        {/* Rating for finished books */}
        {status === "finished" && rating && (
          <Box sx={{ mb: 1 }}>
            <Rating
              value={rating}
              readOnly
              size={compact ? "small" : "medium"}
              sx={{ mb: 0.5 }}
            />
            {dateFinished && (
              <Typography variant="caption" color="text.secondary">
                Finished {formatDate(dateFinished)}
              </Typography>
            )}
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
