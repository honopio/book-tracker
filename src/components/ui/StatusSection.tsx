import React from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";

interface StatusSectionProps {
  status: string;
  onStatusChange: (status: string) => void;
  current?: number;
  total?: number;
  setCurrent?: (value: number) => void;
  editMode?: boolean;
  bookCurrentPage?: number;
}

const statusOptions = [
  { value: "want-to-read", label: "Want to read", color: "success" as const },
  { value: "reading", label: "Currently reading", color: "secondary" as const },
  { value: "finished", label: "Finished", color: "primary" as const },
];

export const StatusSection: React.FC<StatusSectionProps> = ({
  status,
  onStatusChange,
  current,
  total,
  setCurrent,
  editMode = true,
  bookCurrentPage,
}) => {
  const handleStatusClick = (statusValue: string) => {
    onStatusChange(statusValue);

    // Auto-adjust current page based on status selection
    if (setCurrent) {
      if (statusValue === "want-to-read") {
        setCurrent(0);
      } else if (statusValue === "finished" && total !== undefined) {
        setCurrent(total);
      } else if (statusValue === "reading") {
        // Use existing book progress or default to 0
        setCurrent(bookCurrentPage ?? current ?? 0);
      }
    }
  };

  if (!editMode) {
    // Display mode - show single chip
    const currentStatus = statusOptions.find((opt) => opt.value === status);
    return (
      <Box sx={{ mb: 2 }}>
        <Chip
          label={currentStatus?.label || status.replace(/-/g, " ")}
          color={currentStatus?.color}
          sx={{ mb: 2 }}
        />
      </Box>
    );
  }

  // Edit mode - show selectable chips
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6" component="legend" sx={{ mb: 2 }}>
        Book Status
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {statusOptions.map((statusOption) => (
          <Chip
            key={statusOption.value}
            label={statusOption.label}
            variant={status === statusOption.value ? "filled" : "outlined"}
            color={
              status === statusOption.value ? statusOption.color : "default"
            }
            onClick={() => handleStatusClick(statusOption.value)}
            clickable
            sx={{
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: 1,
              },
            }}
          />
        ))}
      </Stack>

      {/* Helper text */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Click a status to update your reading progress
        </Typography>
      </Box>
    </Paper>
  );
};
