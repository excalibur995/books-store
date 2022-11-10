import CategoryCard from "components/CategoryCard";
import Typography from "components/Typography";
import BookCard from "components/BookCard/BookCard";
import Pagination from "components/Pagination/Pagination";
import { styled } from "stitches.config";
import { useQuery } from "@tanstack/react-query";
import { CatgoryEntities } from "domain/category/entitites/category.entities";
import { getCatgeoryList } from "domain/category/services/category.service";
import { useSearchParams } from "react-router-dom";
import { useCategoryStates } from "domain/category/states/category.states";
import { getBookList } from "domain/books/services/book.service";
import { Book } from "domain/books/entities/books.entities";
import { useEffect } from "react";
import {
  useBookParamState,
  useBookStates,
} from "domain/books/states/books.states";

const PageWrapper = styled("div", {
  padding: "$24",
});
const ListWrapper = styled("section", {
  display: "grid",
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

  const { data: categories } = useQuery<CatgoryEntities[], Error>(
    ["useCategoryList"],
    getCatgeoryList,
    {
      initialData: [],
    }
  );
  const { data: books } = useQuery<Book[], Error>(
    ["useBookList", categoryState.categoryId, paramsState.page],
    async () =>
      getBookList({
        categoryId: categoryState.categoryId!,
        page: paramsState.page - 1,
      }),
    {
      initialData: [],
      enabled: !!categoryState.categoryId,
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
    <PageWrapper>
      {booksState.bookmarkedBook.length > 0 && (
        <>
          <BookmarkTitleWrapper>
            <Typography variant="hero" weight="bold">
              Bookmarks
            </Typography>
            <Typography css={{ color: "$primary" }} weight="semibold">
              See All
            </Typography>
          </BookmarkTitleWrapper>
          <ListWrapper
            css={{
              flexing: "row",
              overflow: "scroll hidden",
              whiteSpace: "nowrap",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              figure: { minWidth: 200, "@bp1": { minWidth: "unset" } },
            }}
          >
            {booksState.bookmarkedBook.slice(0, 4).map((item) => (
              <a href="/detail" key={item.id}>
                <BookCard
                  onClick={() => booksState.setBookDetail!(item)}
                  {...item}
                />
              </a>
            ))}
          </ListWrapper>
        </>
      )}
      <Typography variant="hero" weight="bold">
        Explore
      </Typography>
      <ListWrapper
        css={{
          equallyGridColumn: 2,
          "@bp1": { equallyGridColumn: categories.length },
        }}
      >
        {categories.map(({ name, id }) => (
          <CategoryCard
            name={name}
            key={id}
            onClick={() => onNavigateParams(id)}
          />
        ))}
      </ListWrapper>

      <ListWrapper
        css={{
          equallyGridColumn: 2,
          "@bp1": { equallyGridColumn: 3 },
          "@bp2": { equallyGridColumn: books.length / 2 },
        }}
      >
        {books.map((item) => (
          <a href="/detail" key={item.id}>
            <BookCard
              onClick={() => booksState.setBookDetail!(item)}
              {...item}
            />
          </a>
        ))}
      </ListWrapper>
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
  );
};

export default Home;
