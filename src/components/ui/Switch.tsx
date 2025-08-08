import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => {
  return (
    <div
      className={`relative inline-block w-12 h-6 transition-all duration-300 rounded-full ${
        checked ? "bg-blue-500" : "bg-gray-400"
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
          checked ? "translate-x-1" : "-translate-x-5"
        }`}
      />
    </div>
  );
};

export default Switch;
