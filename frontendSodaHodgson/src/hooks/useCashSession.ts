import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  CreateCashSessionDto,
} from "../models/CashSession";
import { cashSessionService } from "../api/cash_sessions";

const QUERY_KEY = ["cashSessions"];

export const useCashSessions = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: cashSessionService.getAll,
  });
};

export const useCashSession = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => cashSessionService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCashSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCashSessionDto) =>
      cashSessionService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};

export const useUpdateCashSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateCashSessionDto;
    }) => cashSessionService.update(id, data),

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

export const useDeleteCashSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      cashSessionService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};