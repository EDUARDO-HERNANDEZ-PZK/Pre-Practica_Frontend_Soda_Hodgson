import User, { CreateUserDto, UpdateUserDto } from "../models/User";
import { api } from "../services/api";

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/user");
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  },

  create: async (
    data: CreateUserDto
  ): Promise<User> => {
    const response = await api.post<User>(
      "/user",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: UpdateUserDto
  ): Promise<User> => {
    const response = await api.put<User>(
      `/user/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/user/${id}`);
  },
};