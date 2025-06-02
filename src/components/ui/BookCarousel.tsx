import React, { useState, useRef, useEffect } from "react";
import { Box, Paper, Typography, Chip, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import BookCard from "./BookCard";
import type { BookCarouselProps } from "../../types";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const BookCarousel: React.FC<BookCarouselProps> = ({
  books,
  title,
  backgroundColor,
  textColor,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false); // to enable/disable scroll arrows buttons
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if scrolling is needed and update scroll state
  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding
  };

  // Scroll right or left by one card width
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 220; // CARD WIDTH including gap
    container.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 220;
    container.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  };

  // Update scroll state on mount and resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener("scroll", updateScrollState); // Listen for scroll events
    const resizeObserver = new ResizeObserver(updateScrollState); // Observe container size changes
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [books.length]);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        backgroundColor,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "hidden",
        // height: "100%", // right column takes full height but left column's cards shrink
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
          variant="h2"
          component="h2"
          sx={{ color: textColor, fontWeight: 600 }}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Navigation arrows only show when scrolling is needed */}
          {(canScrollLeft || canScrollRight) && (
            <>
              <IconButton
                size="small"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                sx={{
                  color: textColor,
                  opacity: canScrollLeft ? 1 : 0.5,
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
                  opacity: canScrollRight ? 1 : 0.5,
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          <Link to="/library" style={{ textDecoration: "none" }}>
            <Chip
              label="see all"
              variant="outlined"
              sx={{
                borderColor: textColor,
                color: textColor,
                "&:hover": {
                  backgroundColor: `${textColor}10`,
                },
              }}
            />
          </Link>
        </Box>
      </Box>

      {/* Books Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2.5,
          overflow: "auto",
          flex: 1,
          scrollBehavior: "smooth",
          // Hide scrollbar but keep functionality
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
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
              <BookCard book={book} viewMode="carousel" textColor={textColor} />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: textColor, opacity: 0.7, textAlign: "center" }}
            >
              No books in this category yet. <br />
              Let's get started!
            </Typography>
            <Link to="/add-book">
              <IconButton
                sx={{
                  color: textColor,
                  border: `1px solid ${textColor}30`,
                  "&:hover": {
                    backgroundColor: `${textColor}10`,
                  },
                }}
                size="large"
              >
                <AddIcon />
              </IconButton>
            </Link>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default BookCarousel;
