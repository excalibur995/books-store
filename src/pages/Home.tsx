import CategoryCard from "components/CategoryCard";
import Typography from "components/Typography";
import Pagination from "components/Pagination/Pagination";
import SearchInput from "components/SearchInput/SearchInput";
import Header from "components/Header";
import BookList from "components/List/BookList";

import { styled } from "stitches.config";
import { useQuery } from "@tanstack/react-query";
import { CatgoryEntities } from "domain/category/entitites/category.entities";
import { getCatgeoryList } from "domain/category/services/category.service";
import { Link, useSearchParams } from "react-router-dom";
import { useCategoryStates } from "domain/category/states/category.states";
import { getBookList } from "domain/books/services/book.service";
import { Book } from "domain/books/entities/books.entities";
import { useEffect, useState } from "react";
import {
  useBookParamState,
  useBookStates,
} from "domain/books/states/books.states";
import BookmarkList from "components/List/BookmarkList";
import { seacrhBookFilter } from "shared/utils";

const PageWrapper = styled("div", {
  padding: "$24",
});
const ListWrapper = styled("section", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  my: "$24",
  gap: "$16",
});

const BookmarkTitleWrapper = styled("section", {
  width: "100%",
  flexing: "row-center",
  justifyContent: "space-between",
});

const PAGE_LIMIT = 10;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const paramsState = useBookParamState((state) => state);
  const categoryState = useCategoryStates((state) => state);
  const booksState = useBookStates((state) => state);
  useEffect(() => {
    if (!!searchParams.get("page")) {
      return paramsState.setPage(Number(searchParams.get("page")));
    }
    paramsState.setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: categories, isFetching: isFetchingCategories } = useQuery<
    CatgoryEntities[],
    Error
  >(["useCategoryList"], getCatgeoryList, {
    initialData: [],
    onSuccess(data) {
      const categoryId = searchParams.get("categoryId");
      if (!categoryId) {
        onNavigateParams(data[0].id);
      }
    },
  });
  const { data: books, isFetching } = useQuery<Book[], Error>(
    ["useBookList", categoryState.categoryId, paramsState.page],
    async () =>
      getBookList({
        categoryId: categoryState.categoryId!,
        page: paramsState.page - 1,
      }),
    {
      initialData: [],
      enabled: !!categoryState.categoryId,
      select: (data) => seacrhBookFilter(searchInput, data),
    }
  );

  const onNavigateParams = (categoryId: number) => {
    categoryState.setCategoryId(categoryId);
    searchParams.set("categoryId", categoryId?.toString() ?? "");
    setSearchParams(searchParams);
    paramsState.setPage(1);
  };

  const onUpdatePage = (pages: number) => {
    searchParams.set("page", pages.toString());
    setSearchParams(searchParams);
  };

  const onIncrementPage = () => {
    paramsState.incrementPage(paramsState.page);
    onUpdatePage(paramsState.page + 1);
  };
  const onDecrementPage = () => {
    paramsState.decrementPage(paramsState.page);
    onUpdatePage(paramsState.page - 1);
  };

  useEffect(() => {
    const categoryId = Number(searchParams.get("categoryId"));
    if (
      typeof categoryId !== "undefined" &&
      categoryId !== null &&
      !isNaN(categoryId)
    ) {
      categoryState.setCategoryId(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Header>
      <PageWrapper>
        {booksState.bookmarkedBook.length > 0 && (
          <>
            <BookmarkTitleWrapper>
              <Typography variant="hero" weight="bold">
                Bookmarks
              </Typography>
              {booksState.bookmarkedBook.length > 4 && (
                <Link to="/bookmarks">
                  <Typography css={{ color: "$primary" }} weight="semibold">
                    See All
                  </Typography>
                </Link>
              )}
            </BookmarkTitleWrapper>
            <BookmarkList
              bookmark={booksState.bookmarkedBook}
              onPickBookMark={booksState.setBookDetail}
            />
          </>
        )}
        <Typography variant="hero" weight="bold">
          Explore
        </Typography>
        <ListWrapper>
          {categories.map(({ name, id }) => (
            <CategoryCard
              name={name}
              key={id}
              onClick={() => onNavigateParams(id)}
            />
          ))}
        </ListWrapper>
        <SearchInput
          disabled={isFetching || isFetchingCategories}
          onChangeEnter={setSearchInput}
          placeholder="Filter Books by Title and Author Name"
          wrapperCss={{
            width: "auto",
            "@bp1": {
              width: "50%",
            },
          }}
        />
        <BookList books={books} onPickItem={booksState.setBookDetail} />
        <Pagination
          current={paramsState.page}
          prevButtonProps={{
            disabled: paramsState.page <= 1,
            onClick: onDecrementPage,
          }}
          nextButtonProps={{
            disabled: books.length < PAGE_LIMIT,
            onClick: onIncrementPage,
          }}
        />
      </PageWrapper>
    </Header>
  );
};

export default Home;
