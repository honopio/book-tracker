import React from "react";
import { Box, Paper, Typography, Rating, Switch } from "@mui/material";

interface BookRatingSectionProps {
  rating: number | null;
  onRatingChange: (newValue: number | null) => void;
  trackRating?: boolean;
  onTrackRatingChange?: (checked: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  showToggle?: boolean;
  disableMessage?: string;
}

export const BookRatingSection: React.FC<BookRatingSectionProps> = ({
  rating,
  onRatingChange,
  trackRating = true,
  onTrackRatingChange,
  disabled = false,
  readOnly = false,
  showToggle = false,
  disableMessage,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      {showToggle && onTrackRatingChange && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Switch
            color="primary"
            size="small"
            checked={trackRating}
            onChange={(e) => onTrackRatingChange(e.target.checked)}
            disabled={disabled}
          />
          <Typography
            variant="h3"
            color={disabled ? "text.secondary" : "text.primary"}
          >
            My rating
          </Typography>
        </Box>
      )}

      {!showToggle && (
        <Typography variant="h3" mb={3}>
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
          disabled={disabled || (showToggle && !trackRating)}
          sx={{ color: "primary.main", mb: showToggle ? 1 : 0 }}
        />
        {disabled && disableMessage && (
          <Typography variant="body2" color="text.secondary">
            {disableMessage}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
