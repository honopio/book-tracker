import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
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
import { RatingSection } from "../ui/RatingSection";
import BackButton from "../ui/BackButton";
import { Comment } from "../ui/Comment";
import { ProgressSection } from "../ui/ProgressSection";

const SingleBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [status, setStatus] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [trackProgress, setTrackProgress] = useState(true);

  // Fetch book details from db
  const fetchBook = async () => {
    const { data, error } = await supabase
      .from("book_user")
      .select(`*, books (title, author)`)
      .eq("id", id)
      .single();
    if (error || !data) {
      setError("Book not found.");
      return;
    }
    setBook({
      ...data,
      title: data.books?.title,
      author: data.books?.author,
      currentPage: data.current_page,
      pageCount: data.page_count,
    });
    setCurrent(data.current_page);
    setTotal(data.page_count);
    setRating(data.rating);
    setComment(data.comment || "");
    setStatus(data.status);
  };

  // Initial fetch
  useEffect(() => {
    fetchBook();
  }, [id]);

  // Validate current and total pages
  const pageError =
    current !== undefined && total !== undefined && current > total;

  // Auto-update status based on current/total page in edit mode
  useEffect(() => {
    if (!editMode) return;
    if (total !== undefined && current === total) {
      setStatus("finished");
    } else if (current && current > 0) {
      setStatus("reading");
    }
  }, [current, total, editMode]);

  // Update book entry
  async function handleSave() {
    if (!book || pageError) return;

    const { error } = await supabase
      .from("book_user")
      .update({
        current_page: current,
        page_count: total,
        rating,
        comment,
        status: status,
      })
      .eq("id", book.id);

    if (error) {
      setError("Failed to update book.");
    } else {
      // Fetch updated book to reflect database trigger changes
      await fetchBook();
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
      navigate("/dashboard", {
        state: { message: "Book deleted successfully" },
      });
    }
  }

  if (!book) return null;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <BackButton />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" gutterBottom>
            {book.title}
          </Typography>
          <IconButton onClick={() => setDeleteDialog(true)}>
            <Delete />
          </IconButton>
        </Stack>
        <Typography variant="h3" color="text.secondary" mb={3}>
          {book.author}
        </Typography>
        {editMode && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1}>
              {["want-to-read", "reading", "finished"].map((statusOption) => (
                <Chip
                  key={statusOption}
                  label={statusOption.replace(/-/g, " ")}
                  variant={status === statusOption ? "filled" : "outlined"}
                  color={status === statusOption ? "primary" : "default"}
                  onClick={() => {
                    setStatus(statusOption);
                    if (statusOption === "want-to-read") {
                      setCurrent(0);
                    } else if (
                      statusOption === "finished" &&
                      total !== undefined
                    ) {
                      setCurrent(total);
                    } else if (statusOption === "reading") {
                      setCurrent(book.currentPage ?? 0);
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
        {!editMode && <Chip label={status.replace(/-/g, " ")} sx={{ mb: 2 }} />}

        {/* Progress */}
        <ProgressSection
          current={current}
          setCurrent={setCurrent}
          total={total}
          setTotal={setTotal}
          editMode={editMode}
          pageError={pageError}
          toggleSwitch={editMode}
          trackProgress={trackProgress}
          setTrackProgress={setTrackProgress}
        />

        <RatingSection
          rating={rating}
          onRatingChange={setRating}
          disabled={status === "want-to-read"}
          readOnly={!editMode}
          showToggle={false}
        />

        {/* Comment */}
        <Comment
          comment={comment}
          setComment={setComment}
          editMode={editMode}
        />

        {/* Edit/Save/Cancel Buttons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
          justifyContent="center" //
        >
          {editMode ? (
            <>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={pageError}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  fetchBook();
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </Stack>
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
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
