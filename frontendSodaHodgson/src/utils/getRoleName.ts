import Role from "../models/Role";

export function getRolName(
  roleId: string,
  roles: Role[]
) {
  const role = roles.find(
    (role) => role.id === roleId
  );

  return role?.name ?? "Sin role";
}