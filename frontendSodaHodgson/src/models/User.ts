export default interface User{
    id: string;
    name: string;
    password: string;
    roleId: string; ///este se va relacionar con el modelo de Role
}
