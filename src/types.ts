export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'want-to-read' | 'finished';
  progress?: number; // 0-100 for currently reading books
  rating?: number; // 1-5 stars for finished books
  pageCount?: number;
  currentPage?: number;
}

export interface BookCardProps extends Book {
  // UI-specific props
  textColor?: string;
  onClick?: () => void;
}

export interface BookCarouselProps {
  books: Book[];
  title: string;
  backgroundColor: string;
  textColor: string;
  maxVisibleBooks?: number;
  height?: number;
  onSeeAll?: () => void;
}