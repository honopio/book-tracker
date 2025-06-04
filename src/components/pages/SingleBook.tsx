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

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "set_status":
      return { ...state, status: action.newValue };
    case "set_rating":
      return { ...state, rating: action.newValue };
    case "set_current":
      return { ...state, current: action.newValue };
    case "set_total":
      return { ...state, total: action.newValue };
    case "set_comment":
      return { ...state, comment: action.newValue };
    case "set_track_progress":
      return { ...state, trackProgress: action.newValue };
    case "set_all":
      return action.newValues;
    default:
      return state;
  }
};

const SingleBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [formState, dispatch] = useReducer(formReducer, {
    status: "",
    rating: null,
    current: undefined,
    total: undefined,
    comment: "",
    trackProgress: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

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
    dispatch({
      type: "set_all",
      newValues: {
        status: data.status,
        rating: data.rating,
        current: data.current_page,
        total: data.page_count,
        comment: data.comment || "",
        trackProgress: true,
      },
    });
  };

  // Initial fetch
  useEffect(() => {
    fetchBook();
  }, [id]);

  // Validate current and total pages
  const pageError =
    formState.current !== undefined &&
    formState.total !== undefined &&
    formState.current > formState.total;

  // Update book entry
  async function handleSave() {
    if (!book || pageError) return;

    const { error } = await supabase
      .from("book_user")
      .update({
        current_page:
          formState.trackProgress && formState.current !== undefined
            ? formState.current
            : null,
        page_count:
          formState.trackProgress && formState.total !== undefined
            ? formState.total
            : null,
        rating: formState.rating,
        comment: formState.comment,
        status: formState.status,
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
          status={formState.status}
          onStatusChange={(newStatus: string) => {
            dispatch({ type: "set_status", newValue: newStatus });
          }}
          current={formState.current}
          total={formState.total}
          setCurrent={(value: number) => {
            dispatch({ type: "set_current", newValue: value });
          }}
          editMode={editMode}
          bookCurrentPage={book.currentPage}
        />

        <ProgressSection
          current={formState.current}
          setCurrent={(value: number) => {
            dispatch({ type: "set_current", newValue: value });
          }}
          total={formState.total}
          setTotal={(value: number) => {
            dispatch({ type: "set_total", newValue: value });
          }}
          pageError={pageError}
          trackProgress={formState.trackProgress}
          setTrackProgress={(value: boolean) => {
            dispatch({ type: "set_track_progress", newValue: value });
          }}
          status={formState.status}
          onStatusChange={(newStatus: string) => {
            dispatch({ type: "set_status", newValue: newStatus });
          }}
        />

        <RatingSection
          rating={formState.rating}
          onRatingChange={(value: number | null) => {
            dispatch({ type: "set_rating", newValue: value });
          }}
          disabled={formState.status === "want-to-read"}
          readOnly={!editMode}
          showToggle={false}
        />

        {/* Comment */}
        <Comment
          comment={formState.comment}
          setComment={(value: string) => {
            dispatch({ type: "set_comment", newValue: value });
          }}
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
