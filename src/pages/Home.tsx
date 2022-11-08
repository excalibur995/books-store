import { useCategoryList } from "domain/category/hooks/category.hooks";

const Home = () => {
  const { data } = useCategoryList();
  console.log(data);
  return <div>Home</div>;
};

export default Home;
