import Typography from "components/Typography";
import { Book } from "domain/books/entities/books.entities";
import React from "react";
import { styled } from "stitches.config";
import BookMarkStar from "./BookMarkStar";

type BookProps = Book & {
  onClick?: () => void;
  onBookMarkBook?: (book: Book) => void;
  isBookMarked?: boolean;
};

const Wrapper = styled("div", {
  flexing: "column",
  textAlign: "left",
  gap: "$4",
  position: "relative",
});

const Figure = styled("figure", {
  margin: 0,
  maxWidth: 250,
});
const Image = styled("img", {
  size: "100%",
});
const TitleSection = styled("div", {
  flexing: "row-center",
  justifyContent: "space-between",
});

const AuthorSection = styled("span", {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "$neutral_grey",
  "span:not(:last-child):after": {
    content: ", ",
    color: "$neutral_grey",
  },
});

const TitleWrapper = styled("div", {
  flexing: "column",
  width: "70%",
});

const BookmarkWrapper = styled("button", {
  background: "none",
  border: "none",
});

const BookCard = ({
  onBookMarkBook,
  isBookMarked,
  onClick,
  ...book
}: BookProps) => {
  const onBookmarkHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    onBookMarkBook?.(book);
  };
  return (
    <Wrapper onClick={onClick}>
      <Figure>
        <Image src={book.cover_url} alt={book.title} />
      </Figure>
      <TitleSection>
        <TitleWrapper>
          <Typography
            css={{
              color: "$primary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            weight="semibold"
          >
            {book.title}
          </Typography>
          <AuthorSection>
            {book.authors.map((author, index) => (
              <Typography
                key={author + index}
                css={{
                  color: "$neutral_grey",
                }}
                variant="caption"
              >
                {author}
              </Typography>
            ))}
          </AuthorSection>
        </TitleWrapper>
        <BookmarkWrapper onClick={onBookmarkHandler}>
          <BookMarkStar size={20} isBookMarked={isBookMarked} />
        </BookmarkWrapper>
      </TitleSection>
    </Wrapper>
  );
};

export default BookCard;
