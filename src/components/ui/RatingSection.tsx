import React from "react";
import { Box, Paper, Typography, Rating, Switch } from "@mui/material";

interface RatingSectionProps {
  rating: number | null;
  onRatingChange: (newValue: number | null) => void;
  trackRating?: boolean;
  onTrackRatingChange?: (checked: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export const RatingSection: React.FC<RatingSectionProps> = ({
  rating,
  onRatingChange,
  trackRating = true,
  onTrackRatingChange,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      {onTrackRatingChange ? (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Switch
            color="primary"
            size="small"
            checked={trackRating}
            onChange={(e) => onTrackRatingChange(e.target.checked)}
            disabled={disabled}
          />
          <Typography
            variant="h4"
            color={disabled ? "text.secondary" : "text.primary"}
          >
            My rating
          </Typography>
        </Box>
      ) : (
        <Typography variant="h4" mb={3}>
          My rating
        </Typography>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Rating
          size="large"
          precision={0.5}
          value={rating}
          onChange={(_, newValue) => onRatingChange(newValue)}
          readOnly={readOnly}
          disabled={disabled || (onTrackRatingChange && !trackRating)}
          sx={{ color: "primary.main", mb: onTrackRatingChange ? 1 : 0 }}
        />
        {disabled && (
          <Typography variant="body2" color="text.secondary">
            You cannot rate a book you haven't read yet.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
