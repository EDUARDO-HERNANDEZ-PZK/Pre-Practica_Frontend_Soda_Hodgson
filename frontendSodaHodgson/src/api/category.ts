import Categories, { CreateCategoryDto } from "../models/Categories";
import { api } from "../services/api";

export const categoriesService = {
  getAll: async (): Promise<Categories[]> => {
    const response = await api.get<Categories[]>("/categories");
    return response.data;
  },

  getById: async (id: string): Promise<Categories> => {
    const response = await api.get<Categories>(`/categories/${id}`);
    return response.data;
  },

  create: async (
    data: CreateCategoryDto
  ): Promise<Categories> => {
    const response = await api.post<Categories>(
      "/categories",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateCategoryDto
  ): Promise<Categories> => {
    const response = await api.put<Categories>(
      `/categories/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};