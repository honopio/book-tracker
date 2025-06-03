import type { Book } from "../types";
import { supabase } from "../client";
import { useEffect, useState } from "react";

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000";

function mapAndSortBooks(data: any[]): Book[] {
  const merged = data.map((row: any) => ({
    title: row.books?.title,
    author: row.books?.author,
    id: row.id,
    status: row.status,
    progress: row.progress,
    rating: row.rating,
    createdAt: row.created_at,
    currentPage: row.current_page,
    pageCount: row.page_count,
  }));
  merged.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return merged as Book[];
}

export function useBooks(isLoggedIn: boolean) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      let query = supabase
        .from("book_user")
        .select(`
          *,
          books (
            title,
            author
          )
        `);

      if (!isLoggedIn) {
        query = query.eq("user_id", DEMO_USER_ID);
      }

      const { data, error } = await query;
      if (error) {
        setBooks([]);
      } else if (data) {
        setBooks(mapAndSortBooks(data));
      }
    }

    fetchBooks();
  }, [isLoggedIn]);

  return books;
}