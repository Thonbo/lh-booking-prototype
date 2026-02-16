'use client';

interface ProductCardProps {
  title: string;
  description: string;
  icon: string;
  selected?: boolean;
  onClick: () => void;
}

export default function ProductCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-6 rounded-2xl border-2 transition-all duration-200
        hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400
        ${
          selected
            ? 'border-yellow-400 bg-yellow-50 shadow-md'
            : 'border-gray-200 bg-white hover:border-yellow-300'
        }
      `}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl" role="img" aria-hidden="true">
          {icon}
        </span>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
}
