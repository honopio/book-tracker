import React, { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Stack,
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
import { StatusSection } from "../ui/StatusSection";
import { LoggedOffAlert } from "../ui/LoggedOffAlert";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "set_status": {
      return { ...state, status: action.newValue };
    }
    case "set_rating": {
      return { ...state, rating: action.newValue };
    }
    case "set_current": {
      return { ...state, current: action.newValue };
    }
    case "set_total": {
      return { ...state, total: action.newValue };
    }
    case "set_comment": {
      return { ...state, comment: action.newValue };
    }
    case "set_edit_mode": {
      return { ...state, editMode: action.newValue };
    }
    case "set_track_progress": {
      return { ...state, trackProgress: action.newValue };
    }
  }
}

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

  // use a reducer instead
  const [state, dispatch] = useReducer(reducer, {
    status: "",
    rating: null,
    current: undefined,
    total: undefined,
    comment: "",
    trackProgress: true,
  });

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
    // setCurrent(data.current_page);
    // setTotal(data.page_count);
    // setRating(data.rating);
    // setComment(data.comment || "");
    // setStatus(data.status);
    dispatch({ type: "set_status", newValue: data.status });
    dispatch({ type: "set_rating", newValue: data.rating });
    dispatch({ type: "set_current", newValue: data.current_page });
    dispatch({ type: "set_total", newValue: data.page_count });
    dispatch({ type: "set_comment", newValue: data.comment || "" });
  };

  // Initial fetch
  useEffect(() => {
    fetchBook();
  }, [id]);

  // Validate current and total pages
  const pageError =
    state.current !== undefined &&
    state.total !== undefined &&
    state.current > state.total;

  // Update book entry
  async function handleSave() {
    if (!book || pageError) return;
    const { error } = await supabase
      .from("book_user")
      .update({
        current_page:
          state.trackProgress && state.current !== undefined
            ? state.current
            : null,
        page_count:
          state.trackProgress && state.total !== undefined ? state.total : null,
        rating: state.rating,
        comment: state.comment,
        status: state.status,
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
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        py: 3,
        mx: "auto",
      }}
    >
      <Paper elevation={1} sx={{ p: { xs: 1, sm: 4 } }}>
        <BackButton />
        <LoggedOffAlert customText="This is a demo with sample books. The changes you make here will not be saved." />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2" gutterBottom>
            {book.title}
          </Typography>
          <IconButton onClick={() => setDeleteDialog(true)}>
            <Delete />
          </IconButton>
        </Stack>
        <Typography variant="h4" color="text.secondary" mb={3}>
          {book.author}
        </Typography>

        {/* Status Section */}
        <StatusSection
          status={state.status}
          onStatusChange={(newStatus: string) => {
            dispatch({ type: "set_status", newValue: newStatus });
          }}
          current={state.current}
          total={state.total}
          setCurrent={(value: number) => {
            dispatch({ type: "set_current", newValue: value });
          }}
          editMode={editMode}
          bookCurrentPage={book.currentPage}
        />

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
          onStatusChange={setStatus}
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
          justifyContent="center"
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
