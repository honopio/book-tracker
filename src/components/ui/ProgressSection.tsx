import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  TextField,
  FormHelperText,
  Switch,
  Chip,
} from "@mui/material";
import { Book } from "@mui/icons-material";

interface ProgressSectionProps {
  current?: number;
  setCurrent: (value: number) => void;
  total?: number;
  setTotal: (value: number) => void;
  trackProgress?: boolean;
  setTrackProgress?: (value: boolean) => void;
  editMode?: boolean;
  pageError?: boolean;
  toggleSwitch?: boolean;
  onStatusChange?: (status: string) => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  current,
  setCurrent,
  total,
  setTotal,
  trackProgress = true,
  setTrackProgress,
  editMode = true,
  pageError = false,
  toggleSwitch = false,
  onStatusChange,
}) => {
  useEffect(() => {
    if (!onStatusChange) return;

    if (total !== undefined && current === total && current > 0) {
      onStatusChange("finished");
    } else if (current && current > 0) {
      onStatusChange("reading");
    } else if (current === 0) {
      onStatusChange("want-to-read");
    }
  }, [current, total, onStatusChange]);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        my: 3,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <Box display="flex" alignItems="center" mb={2} gap={2}>
        {toggleSwitch && (
          <Switch
            color="primary"
            size="small"
            checked={trackProgress}
            onChange={(e) => setTrackProgress?.(e.target.checked)}
          />
        )}
        <Typography variant="h3" mr={2}>
          Track progress
        </Typography>
      </Box>

      {trackProgress ? (
        <>
          <LinearProgress
            variant="determinate"
            value={total && current ? Math.floor((current / total) * 100) : 0}
            sx={{ mb: 1 }}
          />
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Typography variant="body1">
              {current ?? "?"} / {total ?? "?"} pages
            </Typography>

            {total !== undefined &&
              current !== undefined &&
              total > 0 &&
              current === total &&
              current > 0 && (
                <Chip
                  icon={<Book />}
                  label="Completed!"
                  color="success"
                  size="small"
                />
              )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
            color: "text.secondary",
          }}
        >
          <Book />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Page tracking is disabled
            <br />
            <Typography variant="caption" color="text.disabled">
              Enable the switch above to track your reading progress
            </Typography>
          </Typography>
        </Box>
      )}

      {editMode && trackProgress && (
        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <Box display="flex" gap={2}>
            <TextField
              label="Current page"
              type="number"
              value={current ?? ""}
              onChange={(e) => setCurrent(Number(e.target.value))}
              slotProps={{
                htmlInput: { min: 0, max: total ?? undefined },
              }}
              sx={{ width: 150 }}
              error={pageError}
            />
            <TextField
              label="Total pages"
              type="number"
              value={total ?? ""}
              onChange={(e) => setTotal(Number(e.target.value))}
              slotProps={{
                htmlInput: { min: current ?? 0 },
              }}
              sx={{ width: 150 }}
              error={pageError}
            />
          </Box>
          {pageError && (
            <FormHelperText error>
              Current page cannot be greater than total pages
            </FormHelperText>
          )}
          {(current === undefined || total === undefined) && (
            <FormHelperText>
              Please enter the number of pages to track your progress.
            </FormHelperText>
          )}
        </Box>
      )}
    </Paper>
  );
};
