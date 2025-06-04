import type { Book } from "../types";
import { supabase } from "../client";
import { useEffect, useState } from "react";

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000";

function mapBooks(data: any[]): Book[] {
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
  return merged as Book[];
}

export function useBooks(isLoggedIn: boolean) {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function fetchBooks() {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id || DEMO_USER_ID;

      let query = supabase
        .from("book_user")
        .select(`
          *,
          books (
            title,
            author
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) {
        setBooks([]);
      } else if (data) {
        setBooks(mapBooks(data));
      }
    }

    fetchBooks();
  }, [isLoggedIn]);

  return books;
}