import BookCard from "components/BookCard/BookCard";
import { Book } from "domain/books/entities/books.entities";
import { styled } from "stitches.config";

const ListWrapper = styled("section", {
  display: "grid",
  my: "$24",
  gap: "$16",
});

type BookListProps = {
  books: Book[];
  onPickItem?: (item: Book) => void;
};

const BookList = ({ books, onPickItem }: BookListProps) => {
  return (
    <ListWrapper
      css={{
        equallyGridColumn: 2,
        "@bp1": { equallyGridColumn: 3 },
        "@bp2": { equallyGridColumn: 4 },
      }}
    >
      {books.map((item) => (
        <a href="/detail" key={item.id}>
          <BookCard onClick={() => onPickItem?.(item)} {...item} />
        </a>
      ))}
    </ListWrapper>
  );
};

export default BookList;
