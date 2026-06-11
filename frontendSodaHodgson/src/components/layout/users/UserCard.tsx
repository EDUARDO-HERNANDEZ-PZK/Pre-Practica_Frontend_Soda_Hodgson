import { useRoles } from "../../../hooks/useRole";
import User, { UpdateUserDto } from "../../../models/User";
import { getRolName } from "../../../utils/getRoleName";

interface Props {
  user: User;
  onEdit: (id: string,
    data: UpdateUserDto) => void;
  onDelete: (id: string) => void;
}

export default function UserCard({
  user,
  onEdit,
  onDelete,
}: Props) {
  const { data: roles = [] } = useRoles();
  
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      hover:shadow-2xl
      transition
      "
    >
      <div
        className="
        w-16
        h-16
        rounded-full
        bg-cyan-600
        text-white
        flex
        items-center
        justify-center
        text-2xl
        font-bold
        "
      >
        <img src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1" alt="user not found" />
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {user.username}
      </h2>
      {/* 
      <p className="text-slate-500">
        {user.email}
      </p> */}

      <span
        className="
        inline-block
        mt-3
        bg-cyan-100
        text-cyan-700
        px-3
        py-1
        rounded-full
        text-sm
        "
      >
        {getRolName(user.role_id, roles)}
      </span>

      <div className="flex gap-3 mt-6">

        <button
          onClick={()=>onEdit(user.id, user)}
          className="
          flex-1
          bg-cyan-600
          text-white
          p-3
          rounded-xl
          "
        >
          Editar
        </button>

        <button
          onClick={()=>onDelete(user.id)}
          className="
          flex-1
          bg-red-500
          text-white
          p-3
          rounded-xl
          "
        >
          Eliminar
        </button>

      </div>
    </div>
  );
}