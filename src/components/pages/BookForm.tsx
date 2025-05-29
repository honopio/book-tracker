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
} from "@mui/material";

function BookForm() {
  const [status, setStatus] = useState("want-to-read");

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Add a new book to your collection
        </Typography>

        <form>
          <Stack spacing={3}>
            <TextField
              id="book-title"
              label="Title"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              id="book-author"
              label="Author"
              variant="outlined"
              required
              fullWidth
            />

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

            {/* optional page count */}
            {status === "reading" && (
              <Fade in={status === "reading"} timeout={300}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    width: "100%",
                    bgcolor: "secondary.main",
                  }}
                >
                  <Typography variant="h4" component="h5" sx={{ mb: 1 }}>
                    Track your progress
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography>I've read</Typography>
                    <TextField
                      id="book-current-page"
                      type="number"
                      size="small"
                      sx={{ width: 80 }}
                      defaultValue={0}
                    />
                    <Typography>pages out of</Typography>
                    <TextField
                      id="book-page-count"
                      type="number"
                      size="small"
                      sx={{ width: 80 }}
                    />
                    <Typography>pages</Typography>
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
                  bgcolor:
                    status === "want-to-read"
                      ? "background.paper"
                      : "secondary.main",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  component="legend"
                  sx={{ mb: 1 }}
                  color={
                    status === "want-to-read"
                      ? "text.secondary"
                      : "text.primary"
                  }
                >
                  My rating
                </Typography>
                <Rating
                  defaultValue={0}
                  size="medium"
                  precision={0.5}
                  disabled={status === "want-to-read"}
                  sx={{
                    color: "primary.main",
                  }}
                />
                {status === "want-to-read" && (
                  <Typography variant="body2" color="text.secondary">
                    Rate after reading
                  </Typography>
                )}
              </Paper>
            </Box>

            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Book
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default BookForm;
