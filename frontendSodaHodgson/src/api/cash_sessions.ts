import CashSession, { CreateCashSessionDto, } from "../models/CashSession";
import { api } from "../services/api";


export const cashSessionService = {
  getAll: async (): Promise<CashSession[]> => {
    const response = await api.get<CashSession[]>("/cash_sessions");
    return response.data;
  },

  getById: async (id: string): Promise<CashSession> => {
    const response = await api.get<CashSession>(`/cash_sessions/${id}`);
    return response.data;
  },

  create: async (
    data: CreateCashSessionDto
  ): Promise<CashSession> => {
    const response = await api.post<CashSession>(
      "/cash_sessions",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateCashSessionDto
  ): Promise<CashSession> => {
    const response = await api.put<CashSession>(
      `/cash_sessions/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/cash_sessions/${id}`);
  },
};