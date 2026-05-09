import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";

export default function App() {
  return (
    <BrowserRouter>

      <div className="flex">

        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<Users />} />
        </Routes>

      </div>

    </BrowserRouter>
  )
}