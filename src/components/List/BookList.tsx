import BookCard from "components/BookCard/BookCard";
import { Book } from "domain/books/entities/books.entities";
import { styled } from "stitches.config";

const ListWrapper = styled("section", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  my: "$24",
  gap: "$16",
});

type BookListProps = {
  books: Book[];
  onPickItem?: (item: Book) => void;
};

const BookList = ({ books, onPickItem }: BookListProps) => {
  return (
    <ListWrapper>
      {books.map((item) => (
        <a href="/detail" key={item.id}>
          <BookCard onClick={() => onPickItem?.(item)} {...item} />
        </a>
      ))}
    </ListWrapper>
  );
};

export default BookList;
