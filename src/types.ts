export interface BookCardProps {
  id?: string;
  title: string;
  author: string;
  status: 'reading' | 'want-to-read' | 'finished';
  progress?: number; // 0-100 for currently reading books
  rating?: number; // 1-5 stars for finished books
  dateFinished?: string;
  pageCount?: number;
  currentPage?: number;
  onStatusChange?: (newStatus: 'reading' | 'want-to-read' | 'finished') => void;
}

export interface Book extends Omit<BookCardProps, 'children'> {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'want-to-read' | 'finished';
  progress?: number;
  rating?: number;
  pageCount?: number;
  currentPage?: number;
}

export interface BookCarouselProps {
  books: Book[];
  title: string;
  backgroundColor: string;
  textColor: string;
  maxVisibleBooks?: number;
  height?: number;
}