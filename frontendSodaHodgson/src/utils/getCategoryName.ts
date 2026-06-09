import Categories from "../models/Categories";

export function getCategoryName(
  categoryId: string,
  categories: Categories[]
) {
  const category = categories.find(
    (category) => category.id === categoryId
  );

  return category?.name ?? "Sin categoría";
}