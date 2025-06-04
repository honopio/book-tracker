import React, { useState, useReducer } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import BackButton from "../ui/BackButton";
import { RatingSection } from "../ui/RatingSection";
import { Comment } from "../ui/Comment";
import { ProgressSection } from "../ui/ProgressSection";
import { StatusSection } from "../ui/StatusSection";
import { useAuth } from "../../auth/AuthContext";
import { LoggedOffAlert } from "../ui/LoggedOffAlert";
import { formReducer, initialFormState } from "../../hooks/formReducer";

function BookForm() {
  const user = useAuth();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  // const [status, setStatus] = useState("want-to-read");
  // const [rating, setRating] = useState<number | null>(0);
  // const [trackProgress, setTrackProgress] = useState(false);
  const [trackRating, setTrackRating] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // const [comment, setComment] = useState("");
  const navigate = useNavigate();
  // const [current, setCurrentPage] = useState<number | undefined>(undefined);
  // const [total, setPageCount] = useState<number | undefined>(undefined);
  const pageError =
    formState.current !== undefined &&
    formState.total !== undefined &&
    formState.current > formState.total;

  async function createBook(title: string, author: string) {
    // Check if the book exists in the books table
    const { data: bookData } = await supabase
      .from("books")
      .select("*")
      .eq("title", title)
      .eq("author", author)
      .single();

    if (bookData) {
      return bookData.id; // Book already exists, return its id
    }
    // Insert the book into the books table
    const { error } = await supabase
      .from("books")
      .insert([{ title, author }])
      .select()
      .single();
    if (error) {
      return console.error("Error inserting book:", error);
    }
    // fetch the newly created book id
    const { data: newBookData } = await supabase
      .from("books")
      .select("*")
      .eq("title", title)
      .eq("author", author)
      .single();
    return newBookData.id;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      setSubmitError("You must be logged in to add a book.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const title = formData.get("book-title") as string;
    const author = formData.get("book-author") as string;
    const bookId = await createBook(title, author);

    // Insert the book_user entry
    supabase
      .from("book_user")
      .insert([
        {
          book_id: bookId,
          user_id: user.id,
          status: formState.status,
          rating: formState.trackRating ? formState.rating : null,
          ...(formState.trackProgress &&
            formState.current && { current_page: formState.current }),
          ...(formState.trackProgress &&
            formState.total && { page_count: formState.total }),
          comment: formState.comment || null,
        },
      ])
      .then(({ error }) => {
        if (error && error.code === "23505") {
          setSubmitError("This book is already in your collection.");
        } else if (error) {
          setSubmitError("An error occurred. Please try again.");
          console.error("Error inserting book_user:", error);
        } else {
          setSubmitError(null);
          navigate("/dashboard", {
            state: { message: "Book added successfully" },
          });
        }
      });
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        py: 3,
        mx: "auto",
      }}
    >
      <Paper elevation={1} sx={{ p: 3 }}>
        <BackButton />
        {!user && (
          <LoggedOffAlert customText="This is a demo with sample books. The changes you make here will not be saved." />
        )}

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
            Add a book to your collection
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="book-title"
              label="Title"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              name="book-author"
              label="Author"
              variant="outlined"
              required
              fullWidth
            />

            <StatusSection
              status={formState.status}
              onStatusChange={(status) =>
                dispatch({ type: "set_status", newValue: status })
              }
              current={formState.current}
              total={formState.total}
              setCurrent={(current) =>
                dispatch({ type: "set_current", newValue: current })
              }
              bookCurrentPage={formState.current}
            />

            <ProgressSection
              current={formState.current}
              setCurrent={(current) =>
                dispatch({ type: "set_current", newValue: current })
              }
              total={formState.total}
              setTotal={(total) =>
                dispatch({ type: "set_total", newValue: total })
              }
              trackProgress={formState.trackProgress}
              setTrackProgress={(trackProgress) =>
                dispatch({
                  type: "set_track_progress",
                  newValue: trackProgress,
                })
              }
              pageError={pageError}
              status={formState.status}
              onStatusChange={(status) =>
                dispatch({ type: "set_status", newValue: status })
              }
            />

            <RatingSection
              rating={formState.rating}
              onRatingChange={(rating) =>
                dispatch({ type: "set_rating", newValue: rating })
              }
              trackRating={trackRating}
              onTrackRatingChange={setTrackRating}
              disabled={formState.status === "want-to-read"}
            />

            <Comment
              comment={formState.comment}
              setComment={(comment) =>
                dispatch({ type: "set_comment", newValue: comment })
              }
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              disabled={
                !formState.status ||
                (formState.trackProgress &&
                  (pageError || formState.current === undefined))
              }
            >
              Add Book
            </Button>
            {submitError && (
              <Alert
                variant="outlined"
                severity="info"
                sx={{ textAlign: "center" }}
              >
                {submitError}
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default BookForm;
