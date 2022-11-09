import CategoryCard from "components/CategoryCard";
import Typography from "components/Typography";
import { styled } from "stitches.config";
import { useQuery } from "@tanstack/react-query";
import { CatgoryEntities } from "domain/category/entitites/category.entities";
import { getCatgeoryList } from "domain/category/services/category.service";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useCategoryStates } from "domain/category/states/category.states";
import { getBookList } from "domain/books/services/book.service";
import { Book } from "domain/books/entities/books.entities";

const PageWrapper = styled("div", {
  padding: "$24",
});
const CategiryListWrapper = styled("section", {
  display: "grid",
  my: "$16",
  gap: "$16",
});

const Home = () => {
  const navigate = useNavigate();
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
  return (
    <PageWrapper>
      <Typography variant="hero" weight="bold">
        Explore
      </Typography>
      <CategiryListWrapper
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
      </CategiryListWrapper>
      {books.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </PageWrapper>
  );
};

export default Home;
