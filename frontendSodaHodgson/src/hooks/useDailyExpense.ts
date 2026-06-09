import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  CreateDailyExpenseDto,
} from "../models/DailyExpense";

import { dailyExpenseService } from "../api/daily_expense";

const QUERY_KEY = ["dailyExpenses"];

export const useDailyExpenses = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: dailyExpenseService.getAll,
  });
};

export const useDailyExpense = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => dailyExpenseService.getById(id),
    enabled: !!id,
  });
};

export const useCreateDailyExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDailyExpenseDto) =>
      dailyExpenseService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};

export const useUpdateDailyExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateDailyExpenseDto;
    }) => dailyExpenseService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY, variables.id],
      });
    },
  });
};

export const useDeleteDailyExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      dailyExpenseService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};