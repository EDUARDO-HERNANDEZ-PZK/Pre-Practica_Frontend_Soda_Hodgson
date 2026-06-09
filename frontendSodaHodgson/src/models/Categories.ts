export default interface Categories {
  id: string;
  name: string;
}


export type CreateCategoryDto = Omit<Categories, "id">;