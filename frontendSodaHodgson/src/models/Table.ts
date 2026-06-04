export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: "Libre" | "Ocupada" | "Reservada";
}