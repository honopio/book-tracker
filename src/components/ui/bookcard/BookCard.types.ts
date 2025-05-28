// BookCard.types.ts
interface BookCardProps {
  id?: string;
  title: string;
  author: string;
  status: 'reading' | 'want-to-read' | 'finished';
  progress?: number; // 0-100 for currently reading books
  rating?: number; // 1-5 stars for finished books
  dateFinished?: string;
  pageCount?: number;
  currentPage?: number;
  onClick?: () => void;
  onStatusChange?: (newStatus: 'reading' | 'want-to-read' | 'finished') => void;
  showControls?: boolean; // Show quick action buttons
  compact?: boolean; // Compact view for carousels
}

export type { BookCardProps };