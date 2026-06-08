interface Props {
  title: string;
  amount: number;
  color: string;
}

export default function CashStatCard({
  title,
  amount,
  color,
}: Props) {
  return (
    <div
      className={`
        rounded-3xl
        shadow-lg
        p-6
        ${color}
      `}
    >
      <p className="text-sm opacity-80">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        C$ {amount}
      </h2>
    </div>
  );
}