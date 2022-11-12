import Typography from "components/Typography";
import {
  AtomAccordion,
  AtomAccordionItem,
} from "components/Accordion/Accordion";
import { BiTimeFive, BiBook } from "react-icons/bi";

import { Book } from "domain/books/entities/books.entities";
import { styled } from "stitches.config";
import BookMarkStar from "./BookMarkStar";

const Wrapper = styled("div", {
  flexing: "column",
  padding: "$8",
  "@bp1": {
    equallyGridColumn: 2,
  },
});

const Figure = styled("figure", {
  margin: "0 auto",
  padding: "$24",
  minHeight: 300,
  maxWidth: 300,
});
const Image = styled("img", {
  size: "100%",
  filter: "drop-shadow(0 0 0.75rem $colors-neutral_grey)",
  "@bp1": {
    maxHeight: 440,
  },
});

const AuthorSection = styled("span", {
  "span:not(:last-child):after": {
    content: ", ",
  },
});

const NumberSection = styled("section", {
  flexing: "row",
  gap: "$16",
  margin: "$8 0 $16",
  borderTop: "thin solid $neutral",
  padding: "$8 0",
  borderBottom: "thin solid $neutral",
});
const BooksSection = styled("section", {
  margin: "$16 0",
  flexing: "column",
  width: "100%",
  gap: "$8",
});
const NumberSectionItem = styled("span", {
  flexing: "row-center",
  svg: { margin: "0 $4" },
});
const InformationSection = styled("section", {
  flexing: "column",
});

interface BookDetailCardProps {
  book: Book;
  onBookMarkBook: (book: Book) => void;
  isBookMarked?: boolean;
}

const BookDetailCard = ({
  book,
  isBookMarked,
  onBookMarkBook,
}: BookDetailCardProps) => {
  return (
    <Wrapper>
      <Figure>
        <Image src={book?.cover_url} alt={book?.title} />
      </Figure>
      <InformationSection>
        <NumberSectionItem css={{ justifyContent: "space-between" }}>
          <Typography css={{ width: "90%" }} variant="hero" weight="semibold">
            {book?.title}
          </Typography>
          <BookMarkStar
            size={20}
            onClick={() => onBookMarkBook(book)}
            isBookMarked={isBookMarked}
          />
        </NumberSectionItem>
        <AuthorSection>
          {book?.authors?.map((author, index) => (
            <Typography
              key={author + index}
              css={{ color: "$neutral_dark" }}
              variant="subheading"
            >
              {author}
            </Typography>
          ))}
        </AuthorSection>
        <NumberSection>
          <NumberSectionItem>
            <BiBook size={15} />
            <Typography>{book?.sections?.length} Chapters</Typography>
          </NumberSectionItem>
          <NumberSectionItem>
            <BiTimeFive size={15} />
            <Typography>
              {Math.ceil((book?.audio_length ?? 0) / 60)} min
            </Typography>
          </NumberSectionItem>
        </NumberSection>
        <BooksSection>
          <Typography weight="semibold">What is it about?</Typography>
          <Typography>{book?.description}</Typography>
        </BooksSection>
        <BooksSection>
          <Typography weight="semibold">What inside?</Typography>
          {book?.sections?.map((section, index) => (
            <AtomAccordion key={index} type="single" collapsible>
              <AtomAccordionItem
                value={section.title}
                trigger={`${index + 1}. ${section.title}`}
              >
                <Typography>{section.content}</Typography>
              </AtomAccordionItem>
            </AtomAccordion>
          ))}
        </BooksSection>
      </InformationSection>
    </Wrapper>
  );
};

BookDetailCard.defaultProps = {
  book: {
    audio_length: 0,
    authors: [],
    category_id: 0,
    cover_url: "",
    description: "",
    id: 0,
    sections: [],
    title: "",
  },
  onBookMarkBook: () => null,
};
export default BookDetailCard;
