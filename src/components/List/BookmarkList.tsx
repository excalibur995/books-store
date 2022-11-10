import { CSS } from "@stitches/react";
import BookCard from "components/BookCard/BookCard";
import { Book } from "domain/books/entities/books.entities";
import { styled } from "stitches.config";

const ListWrapper = styled("section", {
  display: "grid",
  my: "$24",
  gap: "$16",
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
  return (
    <ListWrapper
      css={{
        flexing: "row",
        overflow: "scroll hidden",
        whiteSpace: "nowrap",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        figure: { minWidth: 200, "@bp1": { minWidth: "unset" } },
        ...css,
      }}
    >
      {bookmark.slice(0, sliced).map((item) => (
        <a href="/detail" key={item.id}>
          <BookCard onClick={() => onPickBookMark?.(item)} {...item} />
        </a>
      ))}
    </ListWrapper>
  );
};

export default BookmarkList;
