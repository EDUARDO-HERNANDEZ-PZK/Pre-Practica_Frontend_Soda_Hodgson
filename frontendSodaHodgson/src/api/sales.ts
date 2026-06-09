
import Sales, { CreateSalesDto } from "../models/Sales";
import { api } from "../services/api";

export const salesService = {
  getAll: async (): Promise<Sales[]> => {
    const response = await api.get<Sales[]>("/sales");
    return response.data;
  },

  getById: async (id: string): Promise<Sales> => {
    const response = await api.get<Sales>(`/sales/${id}`);
    return response.data;
  },

  create: async (
    data: CreateSalesDto
  ): Promise<Sales> => {
    const response = await api.post<Sales>(
      "/sales",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateSalesDto
  ): Promise<Sales> => {
    const response = await api.put<Sales>(
      `/sales/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/sales/${id}`);
  },
};