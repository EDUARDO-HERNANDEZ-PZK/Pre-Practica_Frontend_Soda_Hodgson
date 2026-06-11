import { useState } from "react";

import Header from "../components/layout/Header";
import UserCard from "../components/layout/users/UserCard";
import UserModal from "../components/layout/users/UserModal";
import { useCreateUser, useUsers, useUpdateUser, useDeleteUser } from "../hooks/useUser";
import { CreateUserDto, UpdateUserDto } from "../models/User";
import CreateUserModal from "../components/layout/users/CreateUserModal";
import EditUserModal from "../components/layout/users/EditUserModal";

export default function Users() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: users = [], isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const saveUser = async (
    data: CreateUserDto
  ) => {

    await createUser.mutateAsync(data);

    setShowCreateModal(false);

  };

  const onEditUser = async (
    id: string,
    data: UpdateUserDto
  ) => {

    await updateUser.mutateAsync({
      id,
      data,
    });

    setShowEditModal(false);
    setEditingUser(null);

  };

  const deleteUser = async (
    id: string
  ) => {

    if (
      !window.confirm(
        "¿Eliminar usuario?"
      )
    ) return;

    await deleteUserMutation.mutateAsync(id);

  };

  const editUser = (user: any) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  return (
    <div className="p-8 w-full bg-slate-50 min-h-screen">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

        <Header title="Usuarios y Roles" />

        <button
          onClick={() => {
            setShowCreateModal(true);
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
                (u) => u.role_id === "575201e5b377c1d2"
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
                (u) => u.role_id === "11668d17834b3deb"
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

      <CreateUserModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onSave={saveUser}
      />

      <EditUserModal
        open={showEditModal}
        user={editingUser}
        onClose={() => {
          setShowEditModal(false);
          setEditingUser(null);
        }}
        onEdit={onEditUser}
      />

    </div>
  );
}
