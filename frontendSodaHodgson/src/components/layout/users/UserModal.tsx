import { useEffect, useState } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
}

export default function UserModal({
  open,
  onClose,
  onSave,
  user,
}: UserModalProps) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Mesero",
    status: "Activo",
    avatar: "",
  });

  useEffect(() => {

    if (user) {

      setForm(user);

    } else {

      setForm({
        name: "",
        email: "",
        role: "Mesero",
        status: "Activo",
        avatar: "",
      });

    }

  }, [user]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl mx-4 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6">

          {user ? "Editar Usuario" : "Nuevo Usuario"}

        </h2>

        <div className="space-y-4">

          <input
            placeholder="Nombre"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Correo"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Avatar (Ej: E)"
            value={form.avatar}
            onChange={(e) =>
              setForm({
                ...form,
                avatar: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option>Administrador</option>
            <option>Cajero</option>
            <option>Mesero</option>
            <option>Cocinero</option>
          </select>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-slate-300 px-6 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSave({
                ...form,
                id: user?.id,
              })
            }
            className="bg-cyan-600 text-white px-6 py-3 rounded-xl"
          >
            Guardar
          </button>

        </div>

      </div>

    </div>

  );

}