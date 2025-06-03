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

interface BookCardProps {
  book: Book;
  viewMode?: string; // "grid" | "list" | "carousel"
  textColor?: string;
}

const BookCard = (props: BookCardProps) => {
  const { book, viewMode = "grid", textColor } = props;

  const statusConfig = {
    "want-to-read": { label: "Want to Read", color: "success" as const },
    reading: { label: "Currently Reading", color: "secondary" as const },
    finished: { label: "Finished", color: "primary" as const },
  };
  if (!book) return null;

  const isDashboard = viewMode === "carousel";

  // Shared content
  const TitleAuthor = (
    <Box sx={{ mb: viewMode === "list" ? 0 : 2 }}>
      <Link
        to={`/book/${book.id}`}
        style={{
          textDecoration: "none",
          color: isDashboard ? textColor : "inherit",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: isDashboard ? textColor : "inherit",
            fontWeight: isDashboard ? 600 : "normal",
          }}
        >
          {book.title}
        </Typography>
      </Link>
      <Typography
        variant="body2"
        color={isDashboard ? textColor : "text.secondary"}
        noWrap
        sx={{
          opacity: isDashboard ? 0.8 : 1,
          mt: 0.5,
        }}
      >
        by {book.author}
      </Typography>
    </Box>
  );

  const StatusChip = (
    <Chip
      label={statusConfig[book.status].label}
      color={statusConfig[book.status].color}
      size="small"
      variant={isDashboard ? "outlined" : "filled"}
      sx={{
        mb: isDashboard ? 1 : viewMode === "grid" ? 1 : 0,
        ...(isDashboard && {
          borderColor: textColor,
          color: textColor,
        }),
      }}
    />
  );

  const Progress =
    book.progress !== undefined ? (
      <Box sx={{ my: viewMode === "list" ? 0 : 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          {!isDashboard && (
            <Typography
              variant="caption"
              color={isDashboard ? textColor : "text.secondary"}
              sx={{ opacity: 0.8 }}
            >
              {book.currentPage} / {book.pageCount} pages
            </Typography>
          )}
        </Box>
        <LinearProgress
          variant="determinate"
          value={book.progress}
          sx={{
            height: 6,
            borderRadius: 2,
            backgroundColor: isDashboard ? `${textColor}20` : undefined,
            "& .MuiLinearProgress-bar": {
              backgroundColor: isDashboard ? textColor : undefined,
            },
          }}
        />
      </Box>
    ) : null;

  const RatingBox =
    book.rating !== null && book.rating !== undefined ? (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating
          value={book.rating}
          precision={0.5}
          readOnly
          size="medium"
          sx={{
            color: isDashboard ? textColor : "primary.main",
          }}
        />
      </Box>
    ) : null;

  // Compact layout for carousel in dashboard layout
  if (isDashboard) {
    return (
      <Card
        variant="outlined"
        sx={{
          width: 200,
          height: 220,
          cursor: "pointer",
          transition: "all 0.2s",
          backgroundColor: "transparent",
          border: `2px solid ${textColor}30`,
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent
          sx={{
            p: 2,
            "&:last-child": { pb: 2 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            {TitleAuthor}
            {StatusChip}
            {Progress}
          </Box>
          <Box sx={{ mt: 1 }}>{RatingBox}</Box>
        </CardContent>
      </Card>
    );
  }

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

export default BookCard;
