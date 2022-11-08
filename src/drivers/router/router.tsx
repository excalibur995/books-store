import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("pages/Home"));

export const Router = () => {
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
      </Routes>
    </BrowserRouter>
  );
};