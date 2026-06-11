export default interface User{
    id: string;
    username: string;
    password_hash: string;
    role_id: string; ///este se va relacionar con el modelo de Role
}


export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<CreateUserDto>;