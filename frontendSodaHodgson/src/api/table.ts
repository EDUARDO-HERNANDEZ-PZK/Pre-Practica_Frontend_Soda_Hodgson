
import { CreateTableDto, Table } from "../models/Table";
import { api } from "../services/api";

export const tablesService = {
  getAll: async (): Promise<Table[]> => {
    const response = await api.get<Table[]>("/table");
    return response.data;
  },

  getById: async (id: string): Promise<Table> => {
    const response = await api.get<Table>(`/table/${id}`);
    return response.data;
  },

  create: async (
    data: CreateTableDto
  ): Promise<Table> => {
    const response = await api.post<Table>(
      "/table",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateTableDto
  ): Promise<Table> => {
    const response = await api.put<Table>(
      `/table/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/table/${id}`);
  },
};