import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  LinearProgress,
  Rating,
  Grid,
} from "@mui/material";
import type { Book } from "../../types";
import { Link } from "react-router-dom";

interface BookCardLibraryProps {
  book: Book;
  viewMode?: string; // "grid" | "list" | "carousel"
  textColor?: string;
}

const BookCardLibrary = (props: BookCardLibraryProps) => {
  const { book, viewMode = "grid", textColor } = props;

  const statusConfig = {
    "want-to-read": { label: "Want to Read", color: "success" as const },
    reading: { label: "Currently Reading", color: "secondary" as const },
    finished: { label: "Finished", color: "primary" as const },
  };
  if (!book) return null;

  // Shared content
  const TitleAuthor = (
    <Box sx={{ mb: viewMode === "grid" ? 2 : 0 }}>
      <Link
        to={`/book/${book.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h6" component="h3" noWrap>
          {book.title}
        </Typography>
      </Link>
      <Typography variant="body2" color="text.secondary" noWrap>
        by {book.author}
      </Typography>
    </Box>
  );

  const StatusChip = (
    <Chip
      label={statusConfig[book.status].label}
      color={statusConfig[book.status].color}
      size="small"
      sx={{ mb: viewMode === "grid" ? 1 : 0 }}
    />
  );

  const Progress =
    book.status !== "want-to-read" && book.pageCount ? (
      <Box sx={{ mb: viewMode === "grid" ? 2 : 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: viewMode === "grid" ? 0.5 : 0,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {book.currentPage} / {book.pageCount} pages
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={((book.currentPage ?? 0) / book.pageCount) * 100}
          sx={{
            height: viewMode === "grid" ? 6 : 4,
            borderRadius: viewMode === "grid" ? 3 : 2,
            mt: viewMode === "list" ? 0.5 : 0,
          }}
        />
      </Box>
    ) : null;

  const RatingBox =
    book.rating !== null && book.rating !== undefined ? (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating
          value={book.rating}
          readOnly
          size="small"
          sx={{
            color: "primary.main",
          }}
        />
      </Box>
    ) : null;

  return (
    <Card
      sx={{
        height: viewMode === "grid" ? "100%" : undefined,
        mb: viewMode === "list" ? 2 : 0,
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {viewMode === "grid" ? (
          <>
            {TitleAuthor}
            <Box sx={{ mb: 2 }}>{StatusChip}</Box>
            {Progress}
            {RatingBox}
          </>
        ) : (
          <Grid container spacing={4} alignItems="center">
            <Grid>{TitleAuthor}</Grid>
            <Grid>{StatusChip}</Grid>
            {Progress && <Grid>{Progress}</Grid>}
            <Grid>{RatingBox}</Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCardLibrary;
