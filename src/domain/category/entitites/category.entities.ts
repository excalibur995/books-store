export interface CatgoryEntities {
  id: number;
  name: string;
}

export interface CategoryStates {
  categoryId: number | null;
  setCategoryId: (categoryId: number) => void;
}
