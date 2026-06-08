interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

interface Props {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserCard({
  user,
  onEdit,
  onDelete,
}: Props) {
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
        {user.avatar}
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {user.name}
      </h2>

      <p className="text-slate-500">
        {user.email}
      </p>

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
        {user.role}
      </span>

      <div className="flex gap-3 mt-6">

        <button
          onClick={onEdit}
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
          onClick={onDelete}
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