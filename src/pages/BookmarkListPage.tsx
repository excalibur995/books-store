import Header from "components/Header";
import BookmarkList from "components/List/BookmarkList";
import SearchInput from "components/SearchInput/SearchInput";
import { useBookStates } from "domain/books/states/books.states";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { seacrhBookFilter } from "shared/utils";
import { styled } from "stitches.config";

const Wrapper = styled("div", {
  flexing: "column",
  width: "auto",
  padding: "$8",
});

const BookmarkListPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const bookmarkState = useBookStates((state) => state);
  const memoBookMarked = useMemo(
    () => seacrhBookFilter(searchInput, bookmarkState.bookmarkedBook),
    [bookmarkState.bookmarkedBook, searchInput]
  );
  return (
    <Header
      title="Bookmark List"
      isUsingBackButton
      onClickBackButton={() => navigate(-1)}
    >
      <Wrapper>
        <SearchInput
          onChangeEnter={setSearchInput}
          placeholder="Search Books by Title and Author Name"
          wrapperCss={{ width: "inherit" }}
        />
        <BookmarkList
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            my: "$24",
            gap: "$16",
            a: {
              width: "auto",
            },
            figure: { width: "100%" },
          }}
          bookmark={memoBookMarked}
          sliced={Number.POSITIVE_INFINITY}
          onPickBookMark={bookmarkState.setBookDetail}
        />
      </Wrapper>
    </Header>
  );
};

export default BookmarkListPage;
