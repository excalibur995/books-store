import { useQuery } from "@tanstack/react-query";
import { CatgoryEntities } from "../entitites/category.entities";
import CategoryServices from "../services/category.service";

export async function fetchCategory() {
  const req = new CategoryServices();
  return await req.getCatgeoryList();
}

export function useCategoryList() {
  return useQuery<CatgoryEntities[], Error>(
    ["useCategoryList"],
    fetchCategory,
    {
      initialData: [],
    }
  );
}
