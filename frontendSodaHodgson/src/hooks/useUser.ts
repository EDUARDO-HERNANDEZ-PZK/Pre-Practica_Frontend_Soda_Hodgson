import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { usersService } from "../api/users";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../models/User";

const QUERY_KEY = ["users"];

export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: usersService.getAll,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) =>
      usersService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUserDto;
    }) => usersService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEY,
          variables.id,
        ],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      usersService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
};