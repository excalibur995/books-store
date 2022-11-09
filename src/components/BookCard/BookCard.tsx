import Typography from "components/Typography";
import { Book } from "domain/books/entities/books.entities";
import { styled } from "stitches.config";

const Wrapper = styled("div", {
  flexing: "column",
  textAlign: "left",
  gap: "$4",
  "@bp1": {
    equallyGridColumn: 2,
  },
});
const Figure = styled("figure", {
  margin: 0,
});
const Image = styled("img", {
  size: "100%",
});
const TitleSection = styled("div", {
  flexing: "column",
  textAlign: "left",
  "@bp1": {
    justifyContent: "flex-end",
  },
});

const AuthorSection = styled("span", {
  "span:not(:last-child):after": {
    content: ", ",
  },
});

const BookCard = ({ title, ...rest }: Book) => {
  return (
    <Wrapper>
      <Figure>
        <Image src={rest.cover_url} alt={title} />
      </Figure>
      <TitleSection>
        <Typography weight="semibold">{title}</Typography>
        <AuthorSection>
          {rest.authors.map((author, index) => (
            <Typography
              key={author + index}
              css={{ color: "$neutral_grey" }}
              variant="caption"
            >
              {author}
            </Typography>
          ))}
        </AuthorSection>
      </TitleSection>
    </Wrapper>
  );
};

export default BookCard;
