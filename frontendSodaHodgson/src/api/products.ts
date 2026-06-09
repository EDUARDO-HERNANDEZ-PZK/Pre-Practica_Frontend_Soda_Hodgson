import { CreateProductDto, Product, UpdateProductDto } from "../models/Product";
import { api } from "../services/api";


export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (
    data: CreateProductDto
  ): Promise<Product> => {
    const response = await api.post<Product>(
      "/products",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: UpdateProductDto
  ): Promise<Product> => {
    const response = await api.put<Product>(
      `/products/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};