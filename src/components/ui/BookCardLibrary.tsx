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

interface BookCardLibraryProps {
  book: Book;
  viewMode: string; // "grid" | "list"
}

const BookCardLibrary = (props: BookCardLibraryProps) => {
  const { book, viewMode = "grid" } = props;
  const statusConfig = {
    "want-to-read": { label: "Want to Read", color: "success" as const },
    reading: { label: "Currently Reading", color: "secondary" as const },
    finished: { label: "Finished", color: "primary" as const },
  };
  if (!book) return null;

  return viewMode === "grid" ? (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            by {book.author}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={statusConfig[book.status].label}
            color={statusConfig[book.status].color}
            size="small"
            sx={{ mb: 1 }}
          />
        </Box>

        {book.status !== "want-to-read" && book.pageCount && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="caption" color="text.secondary">
                {book.currentPage} / {book.pageCount} pages
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((book.currentPage ?? 0) / book.pageCount) * 100}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        {book.rating !== null && (
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
        )}
      </CardContent>
    </Card>
  ) : (
    <Card sx={{ mb: 2, cursor: "pointer" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <Typography variant="h6" noWrap>
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              by {book.author}
            </Typography>
          </Grid>

          <Grid>
            <Chip
              label={statusConfig[book.status].label}
              color={statusConfig[book.status].color}
              size="small"
            />
          </Grid>

          {book.status !== "want-to-read" && book.pageCount && (
            <Grid>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {book.currentPage}/{book.pageCount} pages
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={((book.currentPage ?? 0) / book.pageCount) * 100}
                  sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
                />
              </Box>
            </Grid>
          )}

          <Grid>
            {book.rating && (
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
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookCardLibrary;
