import { useState } from "react";

import Header from "../components/layout/Header";
import UserCard from "../components/layout/users/UserCard";
import UserModal from "../components/layout/users/UserModal";

import { usersData } from "../data/users";

export default function Users() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const saveUser = (user) => {
    if (editingUser) {
      setUsers(
        users.map((item) =>
          item.id === user.id ? user : item
        )
      );
    } else {
      setUsers([
        ...users,
        {
          ...user,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;

    setUsers(
      users.filter((item) => item.id !== id)
    );
  };

  const editUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-8 w-full bg-slate-50 min-h-screen">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

        <Header title="Usuarios y Roles" />

        <button
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
          className="
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            shadow-lg
          "
        >
          Nuevo Usuario
        </button>

      </div>

      {/* BUSCADOR */}

      <div className="mt-6">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar usuario..."
          className="
            w-full
            border
            border-slate-200
            rounded-2xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

      </div>

      {/* ESTADÍSTICAS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-slate-500">
            Total Usuarios
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-slate-500">
            Administradores
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              users.filter(
                (u) => u.role === "Administrador"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-slate-500">
            Cajeros
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              users.filter(
                (u) => u.role === "Cajero"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* TARJETAS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          mt-8
        "
      >
        {filteredUsers.map((user) => (

          <UserCard
            key={user.id}
            user={user}
            onEdit={() => editUser(user)}
            onDelete={() => deleteUser(user.id)}
          />

        ))}
      </div>

      {/* MODAL */}

      <UserModal
        open={showModal}
        user={editingUser}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSave={saveUser}
      />

    </div>
  );
}
