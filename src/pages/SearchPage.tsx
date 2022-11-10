import Header from "components/Header";
import SearchInput from "components/SearchInput/SearchInput";
import BookList from "components/List/BookList";
import { useQuery } from "@tanstack/react-query";
import { Book } from "domain/books/entities/books.entities";
import { getBookList } from "domain/books/services/book.service";
import { CatgoryEntities } from "domain/category/entitites/category.entities";
import { getCatgeoryList } from "domain/category/services/category.service";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { seacrhBookFilter } from "shared/utils";
import { styled } from "stitches.config";

import { useBookStates } from "domain/books/states/books.states";

const Wrapper = styled("div", {
  flexing: "column",
  width: "auto",
  padding: "$8",
});

const fetchAllData = async (categories: CatgoryEntities[]) => {
  const fetchList: Promise<Book[]>[] = [];
  categories.forEach(({ id }) =>
    fetchList.push(
      getBookList({ categoryId: id, size: undefined, page: undefined })
    )
  );
  const temp = await Promise.all(fetchList);
  const tempBooks = temp.flatMap((value) => value);
  const final = [...tempBooks].filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.id === value.id || t.title === value.title)
  );
  return final;
};

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const setBookDetail = useBookStates((state) => state.setBookDetail);
  const { data: categories, isFetched } = useQuery<CatgoryEntities[], Error>(
    ["useCategoryList"],
    getCatgeoryList,
    {
      initialData: [],
    }
  );

  const { data: books } = useQuery(
    ["search_all_books", searchInput],
    async () => fetchAllData(categories),
    {
      initialData: [],
      enabled: isFetched && !!searchInput,
      select: (data) => seacrhBookFilter(searchInput, data),
    }
  );

  return (
    <Header
      title="Search Page"
      isUsingBackButton
      onClickBackButton={() => navigate(-1)}
    >
      <Wrapper>
        <SearchInput
          placeholder="Search Books by Title and Author Name"
          wrapperCss={{ width: "inherit" }}
          onChangeEnter={setSearchInput}
        />
        <Suspense fallback={<>Loading...</>}>
          <BookList books={books} onPickItem={setBookDetail} />
        </Suspense>
      </Wrapper>
    </Header>
  );
};

export default SearchPage;
