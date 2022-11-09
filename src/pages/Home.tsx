import CategoryCard from "components/CategoryCard";
import Typography from "components/Typography";
import { styled } from "stitches.config";
import { useQuery } from "@tanstack/react-query";
import { CatgoryEntities } from "domain/category/entitites/category.entities";
import { getCatgeoryList } from "domain/category/services/category.service";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCategoryStates } from "domain/category/states/category.states";
import { getBookList } from "domain/books/services/book.service";
import { Book } from "domain/books/entities/books.entities";
import { useEffect } from "react";
import BookCard from "components/BookCard/BookCard";

const PageWrapper = styled("div", {
  padding: "$24",
});
const ListWrapper = styled("section", {
  display: "grid",
  my: "$24",
  gap: "$16",
});

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryState = useCategoryStates((state) => state);

  const { data: categories } = useQuery<CatgoryEntities[], Error>(
    ["useCategoryList"],
    getCatgeoryList,
    {
      initialData: [],
    }
  );

  const { data: books } = useQuery<Book[], Error>(
    ["useBookList", categoryState.categoryId],
    async () => getBookList({ categoryId: categoryState.categoryId! }),
    {
      initialData: [],
      enabled: !!categoryState.categoryId,
    }
  );

  const onNavigateParams = (categoryId: number) => {
    categoryState.setCategoryId(categoryId);
    navigate({
      pathname: "/",
      search: createSearchParams({
        categoryId: categoryId?.toString() ?? "",
      }).toString(),
    });
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
          <BookCard key={item.id} {...item} />
        ))}
      </ListWrapper>
    </PageWrapper>
  );
};

export default Home;
