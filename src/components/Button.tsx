import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
}: React.PropsWithChildren<{
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  disabled?: boolean;
  className?: string;
}>) {
  const base = "px-3 py-2 rounded-lg text-sm font-medium transition border";
  const styles: Record<Variant, string> = {
    primary: "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:ring-2 focus:ring-indigo-300",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 border-red-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 border-transparent",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}>
      {children}
    </button>
  );
}