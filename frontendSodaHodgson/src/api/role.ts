
import Role, { CreateRoleDto } from "../models/Role";
import { api } from "../services/api";

export const rolesService = {
  getAll: async (): Promise<Role[]> => {
    const response = await api.get<Role[]>("/role");
    return response.data;
  },

  getById: async (id: string): Promise<Role> => {
    const response = await api.get<Role>(`/role/${id}`);
    return response.data;
  },

  create: async (
    data: CreateRoleDto
  ): Promise<Role> => {
    const response = await api.post<Role>(
      "/role",
      data
    );

    return response.data;
  },

  update: async (
    id: string,
    data: CreateRoleDto
  ): Promise<Role> => {
    const response = await api.put<Role>(
      `/role/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/role/${id}`);
  },
};