import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../ui/BackButton";
import { RatingSection } from "../ui/RatingSection";
import { Comment } from "../ui/Comment";
import { ProgressSection } from "../ui/ProgressSection";
import { StatusSection } from "../ui/StatusSection";
import { useAuth } from "../../auth/AuthContext";

function BookForm() {
  const user = useAuth();
  const [status, setStatus] = useState("want-to-read");
  const [rating, setRating] = useState<number | null>(0);
  const [trackProgress, setTrackProgress] = useState(false);
  const [trackRating, setTrackRating] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);
  const [pageCount, setPageCount] = useState<number | undefined>(undefined);
  const pageError =
    currentPage !== undefined &&
    pageCount !== undefined &&
    currentPage > pageCount;

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
          status: status,
          rating: rating,
          ...(trackProgress && currentPage && { current_page: currentPage }),
          ...(trackProgress && pageCount && { page_count: pageCount }),
          comment: comment || null,
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
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <BackButton />
        {!user && (
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Alert severity="info" sx={{ fontSize: "1.25rem", py: 2 }}>
              You have to{" "}
              <Link to="/login" style={{ color: "inherit" }}>
                log in or sign up
              </Link>{" "}
              to add a book to your library
            </Alert>
          </Box>
        )}

        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Add a new book to your collection
        </Typography>

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
              status={status}
              onStatusChange={setStatus}
              current={currentPage}
              total={pageCount}
              setCurrent={setCurrentPage}
              editMode={true}
              bookCurrentPage={currentPage}
            />

            <ProgressSection
              current={currentPage}
              setCurrent={setCurrentPage}
              total={pageCount}
              setTotal={setPageCount}
              trackProgress={trackProgress}
              setTrackProgress={setTrackProgress}
              pageError={pageError}
              toggleSwitch={true}
              onStatusChange={setStatus}
              autoUpdateStatus={true}
            />

            <RatingSection
              rating={rating}
              onRatingChange={setRating}
              trackRating={trackRating}
              onTrackRatingChange={setTrackRating}
              disabled={status === "want-to-read"}
              showToggle={true}
            />

            <Comment
              comment={comment}
              setComment={setComment}
              editMode={true}
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              disabled={
                !status ||
                (trackProgress && (pageError || currentPage === undefined))
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
