import { useBookStates } from "domain/books/states/books.states";
import BookmarkListPage from "pages/BookmarkListPage";
import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("pages/Home"));
const BookDetail = lazy(() => import("pages/BookDetail"));
const SearchPage = lazy(() => import("pages/SearchPage"));
export const Router = () => {
  const bookDetail = useBookStates((state) => state.bookdetail);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/detail"
          element={
            bookDetail ? (
              <Suspense fallback={<h1>Loading...</h1>}>
                <BookDetail />
              </Suspense>
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <SearchPage />
            </Suspense>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <BookmarkListPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
