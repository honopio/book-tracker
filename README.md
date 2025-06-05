# BookTracker

BookTracker is a book tracking app. Its purpose is to help users keep track of their books.
It allows users to add books, browse their library, update their reading progress, rate finished books, and keep notes.  

https://cool-book-tracker.netlify.app/

## Features

- Add books to your personal library, and browse them in the dashboard or the library
- Track reading status: want to read, currently reading, finished
- Update reading progress by pages
- Rate books and comment them
- User authentication
- Responsive design (Material UI)
- Light/dark mode
- Demo mode for logged-out users

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Material UI (MUI)
- **Backend:** Supabase (PostgreSQL, Auth)
- **State Management:** React Context, Custom Hooks

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/book-tracker.git
   cd book-tracker
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Database Setup**

   - Create a new Supabase project.
   - Run the SQL in `schema.sql` to set up tables, constraints, triggers, policies, and seed demo data.

4. **Set up environment variables:**

   - Copy `.env.local.example` to `.env.local` and add your Supabase credentials.

5. **Run the app locally:**

   ```sh
   npm run dev
   ```

6. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

- `src/components/` – UI components (layout, pages, reusable UI)
- `src/hooks/` – Custom React hooks
- `src/context/` – React context providers for global state (theme and authentication)
- `src/types.ts` – TypeScript types
- `src/theme.tsx` – MUI theme customization
