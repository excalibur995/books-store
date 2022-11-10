import create from "zustand";
import { CategoryStates } from "../entitites/category.entities";

export const useCategoryStates = create<CategoryStates>()((set) => ({
  categoryId: null,
  setCategoryId(categoryId) {
    set(() => ({
      categoryId,
    }));
  },
}));
