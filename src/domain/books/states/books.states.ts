import {
  BookParamsState,
  BooksPersistState,
  BooksState,
} from "../entities/books.entities";
import create from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

export const useBookStates = create<BooksState>(
  (persist as unknown as BooksPersistState)(
    (set) => ({
      bookdetail: undefined,
      bookmarkedBook: [],
      setBookDetail: (bookdetail) => {
        set({ bookdetail });
      },
      isBookInBookmark(book_id) {
        return !!this.bookmarkedBook.find(({ id }) => id === book_id);
      },
      resetBookDetail: () => set({ bookdetail: undefined }),
      setBookmark: (book) => {
        set((state) => {
          let clonedState = [...(state.bookmarkedBook ?? [])];
          const spesificBook = clonedState.find((i) => i.id === book.id);
          if (!spesificBook) {
            clonedState.push(book);
            toast.success("Successfully add book to bookmark");
          } else {
            clonedState = clonedState.filter(
              ({ id }) => id !== spesificBook.id
            );
            toast.success("Successfully remove book from the bookmark");
          }
          return { bookmarkedBook: clonedState };
        });
      },
    }),
    { name: "bookmark-store" }
  )
);

export const useBookParamState = create<BookParamsState>()((set) => ({
  page: 1,
  incrementPage: (page) => set({ page: page + 1 }),
  decrementPage: (page) => set({ page: page - 1 }),
  setPage: (page) => set({ page }),
}));
