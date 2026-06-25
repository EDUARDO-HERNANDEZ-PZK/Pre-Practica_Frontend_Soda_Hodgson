import { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";
import Tables from "./pages/Tables";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Cash from "./pages/Cash";
import SalesHistory from "./pages/SalesHistory";
interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col md:flex-row bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pos"
          element={
            <ProtectedRoute>
              <Layout>
                <POS />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <Products />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout>
                <Inventory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <Layout>
                <Tables />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/cash"
  element={
    <ProtectedRoute>
      <Layout>
        <Cash />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/sales-history"
  element={
    <ProtectedRoute>
      <Layout>
        <SalesHistory />
      </Layout>
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}