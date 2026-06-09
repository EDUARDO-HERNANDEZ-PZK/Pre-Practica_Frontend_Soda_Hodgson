import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateCategoryDto } from "../models/Categories";
import { categoriesService } from "../api/category";

const QUERY_KEY = ["categories"];

export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: categoriesService.getAll,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => categoriesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoriesService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryDto }) =>
      categoriesService.update(id, data),

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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};
