export interface Table {
  id: string;
  number: number;
  capacity: number; ///este campo en el backend no existe
  status: "Libre" | "Ocupada" | "Reservada";
}