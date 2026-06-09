import SalesDetail, { CreateSalesDetailDto } from "../models/SalesDetail";
import { api } from "../services/api";

export const salesDetailService = {
  getAll: async (): Promise<SalesDetail[]> => {
    const response = await api.get<SalesDetail[]>("/sales_details");
    return response.data;
  },

  getById: async (id: string): Promise<SalesDetail> => {
    const response = await api.get<SalesDetail>(`/sales_details/${id}`);
    return response.data;
  },

  create: async (
    data: CreateSalesDetailDto
  ): Promise<SalesDetail> => {
    const response = await api.post<SalesDetail>(
      "/sales_details",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateSalesDetailDto
  ): Promise<SalesDetail> => {
    const response = await api.put<SalesDetail>(
      `/sales_details/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/sales_details/${id}`);
  },
};