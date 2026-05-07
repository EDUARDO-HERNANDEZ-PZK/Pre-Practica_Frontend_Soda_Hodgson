import cocacola from "../assets/cocacola.png";
import papas from "../assets/papas.png";
import pollo from "../assets/pollo.png";

export const products = [
  {
    id: 1,
    name: "Gaseosa Cocacola",
    price: 25,
    stock: 45,
    image: cocacola,
  },
  {
    id: 2,
    name: "Papas Fritas",
    price: 20,
    stock: 20,
    image: papas,
  },
  {
    id: 3,
    name: "Pollo Asado",
    price: 180,
    stock: 10,
    image: pollo,
  },
]

export const users = [
  {
    id: 1,
    name: "Eduardo",
    role: "Administrador",
  },
  {
    id: 2,
    name: "Fernando",
    role: "Cajero",
  },
]