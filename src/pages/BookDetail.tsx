import BookDetailCard from "components/BookCard/BookDetailCard";
import Header from "components/Header";
import { useBookStates } from "domain/books/states/books.states";
import { useNavigate } from "react-router-dom";

const BookDetail = () => {
  const book = useBookStates((state) => state.bookdetail);
  const bookmark = useBookStates((state) => state);
  const navigate = useNavigate();
  return (
    <Header
      title={book?.title}
      isUsingBackButton
      onClickBackButton={() => navigate(-1)}
    >
      <BookDetailCard
        book={book}
        onBookMarkBook={bookmark.setBookmark}
        isBookMarked={bookmark.isBookInBookmark(book?.id ?? 0)}
      />
    </Header>
  );
};

export default BookDetail;
