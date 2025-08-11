// components/CommonButton.tsx
import React from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  variant?: "solid" | "gradient";
  theme?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  selectedBut?: boolean;
}

const themeClasses = {
  solid: {
    primary: "bg-primary-500 text-white",
    secondary: "bg-gray-600 text-white",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
  },
  gradient: {
    primary:
      "bg-[#EF4A23] from-primary-500 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white",
    secondary:
      "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white",
    danger:
      "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white",
    success:
      "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white",
    outline:
      "bg-[#fff] text-[#EF4A23] border-[#EF4A23] border-[1px] hover:bg-[#EF4A23] hover:text-[#fff]",
  },
};

const sizeClasses = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  loading = false,
  variant = "gradient",
  theme = "primary",
  size = "md",
  fullWidth = true,
  selectedBut = false,
}) => {
  const colorClass = themeClasses[variant][theme];
  const sizeClass = sizeClasses[size];

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={classNames(
        "customButtom rounded-3xl font-semibold duration-300",
        fullWidth && "w-full",
        sizeClass,
        colorClass,
        {
          "opacity-50 cursor-not-allowed": disabled || loading,
        },
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
