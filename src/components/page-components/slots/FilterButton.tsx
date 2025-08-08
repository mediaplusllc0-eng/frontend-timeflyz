
import { ChevronDown } from "lucide-react";

interface FilterButtonProps {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  selectedOptionLabel: string | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FilterButton({
  name,
  icon,
  isActive,
  selectedOptionLabel,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-1 border-gray-200  text-sm font-medium transition-all text-gray-500 ${
        isActive
          ? "bg-gray-100 border-gray-200 text-black"
          : selectedOptionLabel
          ? "bg-blue-100 border-gray-200 text-gray-500"
          : "hover:bg-gray-50"
          
      }`}
    >
      {icon}
      {name}
      <ChevronDown
        size={16}
        className={`transition-transform ${isActive ? "rotate-180" : ""}`}
      />
      {selectedOptionLabel && (
        <span className="ml-2 text-sm text-gray-600">{selectedOptionLabel}</span>
      )}
    </button>
  );
}
