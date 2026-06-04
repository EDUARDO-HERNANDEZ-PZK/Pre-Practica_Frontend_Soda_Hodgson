import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";
import Tables from "./pages/Tables";

export default function App() {
  return (
    <BrowserRouter>

      <div className="flex flex-col md:flex-row bg-slate-100 min-h-screen">

        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tables" element={<Tables />} />
        </Routes>

      </div>

    </BrowserRouter>
  )
}