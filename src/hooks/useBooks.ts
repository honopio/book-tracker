import type { Book } from "../types";
import { supabase } from "../client";
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000";
import { useEffect, useState } from "react";

export function useBooks(isLoggedIn: boolean) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      if (!isLoggedIn) {
        // fetch demo data for logged-out users
        const { data, error } = await supabase
          .from("book_user")
          .select(
            `
        *,
        books (
          title,
          author
        )
      `
          )
          .eq("user_id", DEMO_USER_ID);
        console.log("Fetched demo books:", data, error);
        if (!error && data) {
          console.log("no error and data");
          // Flatten and map DB fields to Book props
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
          setBooks(merged as Book[]);
        }
        return;
      }

      // Fetch * from book_user table and join with titles and authors from books table
      const { data, error } = await supabase.from("book_user").select(`
          *,
          books (
            title,
            author
          )
        `);
      console.log("Fetched books:", data, error);
      if (!error && data) {
        // Flatten and map DB fields to Book props
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
        setBooks(merged as Book[]);
      }
    }
    fetchBooks();
  }, [isLoggedIn]);

  return books;
}