import { name } from './../../node_modules/espree/dist/espree.d';
export interface User{
    id: string;
    name: string;
    role: UserRole;
}

export enum UserRole {
    ADMINISTRADOR = "Administrador",
    CAJERO = "Cajero",
}