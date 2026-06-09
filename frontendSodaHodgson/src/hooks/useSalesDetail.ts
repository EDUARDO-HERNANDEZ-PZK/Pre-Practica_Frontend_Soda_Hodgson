import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { CreateSalesDetailDto } from "../models/SalesDetail";
import { salesDetailService } from "../api/sales_detail";

const QUERY_KEY = ["sales_details"];

export const useSalesDetails = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: salesDetailService.getAll,
  });
};

export const useSalesDetail = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => salesDetailService.getById(id),
    enabled: !!id,
  });
};

export const useCreateSalesDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSalesDetailDto) =>
      salesDetailService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};

export const useUpdateSalesDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateSalesDetailDto;
    }) => salesDetailService.update(id, data),

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

export const useDeleteSalesDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      salesDetailService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};