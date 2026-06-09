import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { productsService } from "../api/products";
import {
  CreateProductDto,
  UpdateProductDto,
} from "../models/Product";

const QUERY_KEY = ["products"];

export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: productsService.getAll,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) =>
      productsService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductDto;
    }) => productsService.update(id, data),

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

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      productsService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};