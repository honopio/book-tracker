import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Rating,
  TextField,
  Button,
  IconButton,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { Book } from "../../types";

const SingleBook: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" gutterBottom>
            {book.title}
          </Typography>
          <IconButton onClick={() => setDeleteDialog(true)} color="error">
            <Delete />
          </IconButton>
        </Stack>
        <Typography variant="h3" color="text.secondary" mb={3}>
          {book.author}
        </Typography>
        <Chip label={book.status.replace(/-/g, " ")} sx={{ mb: 2 }} />

        {/* Progress */}
        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>
            Progress: Page {progress ?? 0} of {book.page_count ?? "?"}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={
              book.page_count
                ? Math.min(100, ((progress ?? 0) / book.page_count) * 100)
                : 0
            }
            sx={{ mb: 1 }}
          />
          {editMode ? (
            <TextField
              label="Current Page"
              type="number"
              value={progress ?? ""}
              onChange={(e) => setProgress(Number(e.target.value))}
              slotProps={{
                htmlInput: { min: 0, max: book.page_count },
              }}
              sx={{ width: 120 }}
            />
          ) : null}
        </Box>

        {/* Rating */}
        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>My Rating:</Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            readOnly={!editMode}
            precision={0.5}
          />
        </Box>

        {/* Comment */}
        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>Comment:</Typography>
          {editMode ? (
            <TextField
              multiline
              minRows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
          ) : (
            <Typography>{comment || <i>No comment</i>}</Typography>
          )}
        </Box>

        {/* Edit/Save/Cancel Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          {editMode ? (
            <>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Book Entry?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this book entry? This cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SingleBook;
