import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export interface Section {
  title: string;
  content: string;
}

export interface Book {
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: Section[];
  audio_length: number;
}

export interface BooksParams {
  categoryId?: number;
  size?: number;
  page?: number;
}

export interface BookParamsState {
  page: number;
  incrementPage: (page: number) => void;
  decrementPage: (page: number) => void;
  setPage: (page: number) => void;
}

export interface BooksState {
  bookdetail?: Book;
  bookmarkedBook: Book[];
  setBookmark: (book: Book) => void;
  resetBookDetail: () => void;
  setBookDetail: (book: Book) => void;
  isBookInBookmark: (id: number) => boolean;
}

export type BooksPersistState = (
  config: StateCreator<BooksState>,
  options: PersistOptions<BooksState>
) => StateCreator<BooksState>;
