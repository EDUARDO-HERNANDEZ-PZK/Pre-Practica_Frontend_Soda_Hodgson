interface Props {
  title: string;
  value: string;
  color: string;
}

export default function StatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      p-6
      hover:scale-105
      transition-all
      duration-300
      "
    >
      <p className="text-slate-500 font-medium">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>
    </div>
  );
}