import { useBookStates } from "domain/books/states/books.states";
import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("pages/Home"));
const BookDetail = lazy(() => import("pages/BookDetail"));
const Header = lazy(() => import("components/Header"));
export const Router = () => {
  const bookDetail = useBookStates((state) => state.bookdetail);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Header>
                <HomePage />
              </Header>
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
      </Routes>
    </BrowserRouter>
  );
};
