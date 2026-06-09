export interface Table {
  id: string;
  table_number: number;
  capacity: number; ///este campo en el backend no existe
  status: "Disponible" | "Ocupada" | "Reservada";
}

export type CreateTableDto = Omit<Table, "id">;