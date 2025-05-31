import React from "react";
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  TextField,
  FormHelperText,
} from "@mui/material";

interface ProgressSectionProps {
  current?: number;
  setCurrent: (value: number) => void;
  total?: number;
  setTotal: (value: number) => void;
  editMode?: boolean;
  pageError?: boolean;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  current,
  setCurrent,
  total,
  setTotal,
  editMode = false,
  pageError = false,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        my: 3,
      }}
    >
      <Typography variant="h3" mb={3}>
        Progress
      </Typography>
      <LinearProgress
        variant="determinate"
        value={total && current ? Math.floor((current / total) * 100) : 0}
        sx={{ mb: 1 }}
      />
      <Typography variant="body1" mb={2}>
        {current ?? 0} / {total ?? "?"} pages
      </Typography>

      {editMode && (
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
              sx={{ width: 120 }}
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
              sx={{ width: 120 }}
              error={pageError}
            />
          </Box>
          {pageError && (
            <FormHelperText error>
              Current page cannot be greater than total pages
            </FormHelperText>
          )}
        </Box>
      )}
    </Paper>
  );
};
