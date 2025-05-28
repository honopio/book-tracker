import React, { useState, useRef, useEffect } from "react";
import { Box, Paper, Typography, Chip, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import BookCard from "./bookcard/BookCard";
import type { BookCarouselProps } from "../../types";

const BookCarousel: React.FC<BookCarouselProps> = ({
  books,
  title,
  backgroundColor,
  textColor,
  maxVisibleBooks = 3,
  height = 400,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate how many books can actually fit in the container
  const cardWidth = 220; // 200px card + 20px gap
  const actualVisibleBooks =
    Math.floor(containerWidth / cardWidth) || maxVisibleBooks;
  const needsScrolling = books.length > actualVisibleBooks;

  // Calculate if we can scroll
  const canScrollLeft = currentIndex > 0;
  const canScrollRight =
    needsScrolling && currentIndex < books.length - actualVisibleBooks;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Update container width when it changes
  useEffect(() => {
    const updateWidth = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Auto-scroll the container when currentIndex changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 220; // 200px card + 20px gap
      const scrollPosition = currentIndex * cardWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Reset index when books change
  useEffect(() => {
    setCurrentIndex(0);
  }, [books.length]);

  return (
    <Paper
      elevation={1}
      sx={{
        height,
        p: 3,
        backgroundColor,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{ color: textColor, fontWeight: 600 }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Navigation arrows only show when scrolling is needed */}
          {needsScrolling && (
            <>
              <IconButton
                size="small"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                sx={{
                  color: textColor,
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                size="small"
                onClick={scrollRight}
                disabled={!canScrollRight}
                sx={{
                  color: textColor,
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          <Chip label="see all" variant="outlined" />
        </Box>
      </Box>

      {/* Books Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2.5,
          overflow: "hidden",
          flex: 1,
          scrollBehavior: "smooth",
        }}
      >
        {books.length > 0 ? (
          books.map((book) => (
            <Box
              key={book.id}
              sx={{
                flexShrink: 0,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                status={book.status}
                progress={book.progress}
                rating={book.rating}
                pageCount={book.pageCount}
                currentPage={book.currentPage}
                textColor={textColor}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: textColor, opacity: 0.7 }}>
              📚
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: textColor, opacity: 0.7, textAlign: "center" }}
            >
              No books in this category yet
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: textColor, opacity: 0.5, textAlign: "center" }}
            >
              Add some books to get started!
            </Typography>
          </Box>
        )}
      </Box>

      {/* Pagination dots */}
      {needsScrolling && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 2,
            flexShrink: 0,
          }}
        >
          {Array.from({
            length: Math.ceil(
              Math.max(0, books.length - actualVisibleBooks) + 1
            ),
          }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex
                    ? textColor
                    : "rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default BookCarousel;
