import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Button,
  Stack,
  Fade,
  Switch,
  Alert,
} from "@mui/material";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

function BookForm() {
  const [status, setStatus] = useState("want-to-read");
  const [rating, setRating] = useState<number | null>(0);
  const [trackProgress, setTrackProgress] = useState(false);
  const [trackRating, setTrackRating] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    const formData = new FormData(event.currentTarget);
    const title = formData.get("book-title") as string;
    const author = formData.get("book-author") as string;
    const currentPage = formData.get("book-current-page");
    const pageCount = formData.get("book-page-count");
    const rating = formData.get("book-rating");
    const comment = formData.get("book-comment") as string;

    const bookId = await createBook(title, author);

    // Insert the book_user entry
    supabase
      .from("book_user")
      .insert([
        {
          book_id: bookId,
          user_id: 1, // HARDCODED UNTIL AUTH IS IMPLEMENTED
          status: status,
          rating: rating ? parseFloat(rating as string) : null,
          ...(trackProgress &&
            currentPage && {
              current_page: currentPage,
            }),
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
          navigate("/dashboard");
        }
      });
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
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

            <Paper
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Book Status
                </FormLabel>
                <RadioGroup
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name="book-status"
                >
                  <FormControlLabel
                    value="want-to-read"
                    control={<Radio />}
                    label="I want to read it"
                  />
                  <FormControlLabel
                    value="reading"
                    control={<Radio />}
                    label="I am currently reading it"
                  />
                  <FormControlLabel
                    value="finished"
                    control={<Radio />}
                    label="I finished reading it"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>

            {/* optional current page */}
            {/* optional page count */}
            {status === "reading" && (
              <Fade in={status === "reading"} timeout={300}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Switch
                      name="book-track-progress"
                      color="primary"
                      size="small"
                      checked={trackProgress}
                      onChange={(e) => setTrackProgress(e.target.checked)}
                    />
                    <Typography variant="h3">Track your progress</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      color={trackProgress ? "text.primary" : "text.secondary"}
                    >
                      I've read
                    </Typography>
                    <TextField
                      name="book-current-page"
                      type="number"
                      size="small"
                      sx={{ width: 80 }}
                      slotProps={{ htmlInput: { min: 0 } }}
                      disabled={!trackProgress}
                      required={trackProgress}
                    />
                    <Typography
                      color={trackProgress ? "text.primary" : "text.secondary"}
                    >
                      pages out of
                    </Typography>
                    <TextField
                      name="book-page-count"
                      type="number"
                      size="small"
                      sx={{ width: 80 }}
                      slotProps={{ htmlInput: { min: 0 } }}
                      disabled={!trackProgress}
                      required={trackProgress}
                    />
                    <Typography
                      color={trackProgress ? "text.primary" : "text.secondary"}
                    >
                      pages
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            )}

            {/* optional rating section */}
            <Box>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Switch
                    name="book-track-rating"
                    color="primary"
                    size="small"
                    checked={trackRating}
                    onChange={(e) => {
                      setTrackRating(e.target.checked);
                      if (!e.target.checked) {
                        setRating(null);
                      }
                    }}
                    disabled={status === "want-to-read"}
                  />
                  <Typography
                    variant="h3"
                    color={
                      status === "want-to-read"
                        ? "text.secondary"
                        : "text.primary"
                    }
                  >
                    My rating
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    defaultValue={0}
                    size="large"
                    precision={0.5}
                    disabled={status === "want-to-read" || !trackRating}
                    sx={{
                      color: "primary.main",
                      mb: 1,
                    }}
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    name="book-rating"
                  />
                  {status === "want-to-read" && (
                    <Typography variant="body2" color="text.secondary">
                      Rate after reading
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Box>

            {/* text field for personal comment */}
            <Paper
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h3" component="legend" sx={{ mb: 2 }}>
                Comment
              </Typography>
              <TextField
                name="book-comment"
                label="Comment"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                placeholder="Add a personal comment about this book..."
                sx={{ mb: 2 }}
              />
            </Paper>

            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
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
