import { useState } from "react";
import { CreateUserDto } from "../../../models/User";
import { useRoles } from "../../../hooks/useRole";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateUserDto) => void;
}

export default function CreateUserModal({
  open,
  onClose,
  onSave,
}: Props) {
  const { data: roles = [] } = useRoles();

  const initialForm = {
    username: "",
    password_hash: "",
    role_id: "",
  };

  const [form, setForm] = useState(initialForm);

  const resetForm = () => {
    setForm(initialForm);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Nuevo Usuario
        </h2>

        <div className="space-y-4">

          <label className="block mb-2 font-medium">
            Nombre Usuario
          </label>
          <input
            placeholder="Usuario"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />
          <label className="block mb-2 font-medium">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password_hash}
            onChange={(e) =>
              setForm({
                ...form,
                password_hash: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <label className="block mb-2 font-medium">
            Role
          </label>
          <select
            value={form.role_id}
            onChange={(e) =>
              setForm({
                ...form,
                role_id: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="">
              Seleccione un rol
            </option>

            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
              >
                {role.name}
              </option>
            ))}
          </select>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="bg-slate-300 px-6 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onSave(form);
              resetForm();
            }}
            className="bg-cyan-600 text-white px-6 py-3 rounded-xl"
          >
            Crear
          </button>

        </div>

      </div>

    </div>
  );
}