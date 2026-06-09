import DailyExpense, { CreateDailyExpenseDto } from "../models/DailyExpense";
import { api } from "../services/api";

export const dailyExpenseService = {
  getAll: async (): Promise<DailyExpense[]> => {
    const response = await api.get<DailyExpense[]>("/daily_expense");
    return response.data;
  },

  getById: async (id: string): Promise<DailyExpense> => {
    const response = await api.get<DailyExpense>(`/daily_expense/${id}`);
    return response.data;
  },

  create: async (
    data: CreateDailyExpenseDto
  ): Promise<DailyExpense> => {
    const response = await api.post<DailyExpense>(
      "/daily_expense",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateDailyExpenseDto
  ): Promise<DailyExpense> => {
    const response = await api.put<DailyExpense>(
      `/daily_expense/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/daily_expense/${id}`);
  },
};