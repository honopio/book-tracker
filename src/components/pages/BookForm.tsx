// form to add or edit a book
import FormControl from "@mui/material/FormControl";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

function BookForm() {
  const [status, setStatus] = useState("want-to-read");

  return (
    <form>
      <h1>Add a new book to your collection</h1>

      <TextField
        id="book-title"
        label="Title"
        variant="outlined"
        required
        placeholder="Enter the book title"
      />
      <TextField
        id="book-author"
        label="Author"
        variant="outlined"
        required
        placeholder="Enter the book author"
      />
      <FormControl variant="outlined" margin="normal">
        <FormLabel component="legend">Book Status</FormLabel>
        <RadioGroup
          defaultValue="want-to-read"
          name="book-status"
          row
          onChange={(e) => setStatus(e.target.value)}
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>I read</span>
          <TextField
            id="book-current-page"
            label=""
            type="number"
            size="small"
            sx={{ width: 80 }}
            defaultValue={0}
          />
          <span>pages out of</span>
          <TextField
            id="book-page-count"
            label=""
            type="number"
            size="small"
            sx={{ width: 80 }}
          />
          <span>pages</span>
        </div>
      )}

      {/* optional rating */}
      <Typography component="legend">My rating</Typography>
      <Rating
        defaultValue={0}
        size="medium"
        precision={0.5}
        disabled={status === "want-to-read"}
      />

      <Button variant="outlined" type="submit">
        Add Book
      </Button>
    </form>
  );
}

export default BookForm;
