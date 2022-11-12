import { CSS } from "@stitches/react";
import BookCard from "components/BookCard/BookCard";
import { Book } from "domain/books/entities/books.entities";
import { useBookStates } from "domain/books/states/books.states";
import { styled } from "stitches.config";

const ListWrapper = styled("section", {
  my: "$24",
  gap: "$16",
});

const Href = styled("a", {
  width: 130,
});

type BookmarkListProps = {
  bookmark: Book[];
  sliced?: number;
  onPickBookMark?: (bookmark: Book) => void;
  css?: CSS;
};

const BookmarkList = ({
  bookmark,
  sliced = 4,
  onPickBookMark,
  css,
}: BookmarkListProps) => {
  const booksState = useBookStates((state) => state);

  return (
    <ListWrapper
      css={{
        flexing: "row",
        overflow: "scroll hidden",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        figure: { width: 130, "@bp1": { minWidth: "unset" } },
        ...css,
      }}
    >
      {bookmark.slice(0, sliced).map((item) => (
        <Href href="/detail" key={item.id}>
          <BookCard
            onClick={() => onPickBookMark?.(item)}
            isBookMarked={booksState.isBookInBookmark(item.id)}
            onBookMarkBook={booksState.setBookmark}
            {...item}
          />
        </Href>
      ))}
    </ListWrapper>
  );
};

export default BookmarkList;
