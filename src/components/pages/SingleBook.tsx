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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { supabase } from "../../client";
import type { Book } from "../../types";

const SingleBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Fetch book entry
  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      const { data, error } = await supabase
        .from("book_user")
        .select(`*, books (title, author)`)
        .eq("id", id)
        .single();
      if (error || !data) {
        setError("Book not found.");
        setLoading(false);
        return;
      }
      setBook({
        ...data,
        title: data.books?.title,
        author: data.books?.author,
      });
      setProgress(data.current_page);
      setRating(data.rating);
      setComment(data.comment || "");
      setLoading(false);
    }
    fetchBook();
  }, [id]);

  // Update book entry
  async function handleSave() {
    if (!book) return;
    const { error } = await supabase
      .from("book_user")
      .update({
        current_page: progress,
        rating,
        comment,
      })
      .eq("id", book.id);
    if (error) {
      setError("Failed to update book.");
    } else {
      setEditMode(false);
      setError(null);
    }
  }

  // Delete book entry
  async function handleDelete() {
    if (!book) return;
    const { error } = await supabase
      .from("book_user")
      .delete()
      .eq("id", book.id);
    if (error) {
      setError("Failed to delete book.");
    } else {
      navigate("/dashboard", { state: { message: "Book deleted." } });
    }
  }

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!book) return null;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
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
            value={
              book.page_count
                ? Math.min(100, ((progress ?? 0) / book.page_count) * 100)
                : 0
            }
            sx={{ mb: 1 }}
          />
          <Typography variant="body1" mb={2}>
            {progress ?? 0} / {book.page_count ?? "?"} pages
          </Typography>

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
        </Paper>

        {/* Rating */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            my: 3,
          }}
        >
          <Typography variant="h3" mb={3}>
            My rating
          </Typography>
          <Rating
            size="large"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            readOnly={!editMode}
            precision={0.5}
            sx={{
              color: "primary.main",
            }}
          />
        </Paper>

        {/* Comment */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            my: 3,
          }}
        >
          <Typography variant="h3" mb={3}>
            My thoughts
          </Typography>
          {editMode ? (
            <TextField
              multiline
              minRows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
          ) : (
            <Box
              minHeight={70}
              display="flex"
              alignItems="center"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
              }}
            >
              <Typography>{comment}</Typography>
            </Box>
          )}
        </Paper>

        {/* Edit/Save/Cancel Buttons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
          justifyContent="center" //
        >
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
        <DialogTitle>Delete from library</DialogTitle>
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
