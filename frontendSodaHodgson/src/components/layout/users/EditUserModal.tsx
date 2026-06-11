import { useEffect, useState } from "react";
import User, { CreateUserDto } from "../../../models/User";
import { useRoles } from "../../../hooks/useRole";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onEdit: (
    id: string,
    data: CreateUserDto
  ) => void;
}

export default function EditUserModal({
  open,
  onClose,
  user,
  onEdit,
}: Props) {
  const { data: roles = [] } = useRoles();

  const initialForm = {
    username: "",
    password_hash: "",
    role_id: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {

    if (user) {

      setForm({
        username: user.username,
        password_hash: user.password_hash,
        role_id: user.role_id,
      });

    }

  }, [user]);

  const resetForm = () => {
    setForm(initialForm);
  };

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Editar Usuario
        </h2>

        <div className="space-y-4">

          <label className="block mb-2 font-medium">
            Nombre Usuario
          </label>
          <input
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
              onEdit(user.id, form)
              resetForm();
            }}
            className="bg-cyan-600 text-white px-6 py-3 rounded-xl"
          >
            Actualizar
          </button>

        </div>

      </div>

    </div>
  );
}