import clsx from "clsx";
import { FC, ReactNode } from "react";

const colors = (outline: boolean) => ({
  sky: outline
    ? "bg-transparent text-sky-500 hover:bg-sky-400 hover:text-white border-sky-500 hover:border-sky-400"
    : "bg-sky-500 hover:bg-sky-400 border-sky-500 hover:border-sky-400",
  red: outline
    ? "bg-transparent text-red-500 hover:bg-red-400 hover:text-white border-red-500 hover:border-red-400"
    : "bg-red-500 hover:bg-red-400 border-red-500 hover:border-red-400",
  green: outline
    ? "bg-transparent text-green-500 hover:bg-green-400 hover:text-white border-green-500 hover:border-green-400"
    : "bg-green-500 hover:bg-green-400 border-green-500 hover:border-green-400",
  gray: outline
    ? "bg-transparent text-slate-500 hover:bg-slate-400 hover:text-white border-slate-500 hover:border-slate-400"
    : "bg-slate-500 hover:bg-slate-400 border-slate-500 hover:border-slate-400",
});

interface ButtonProps {
  variant?: keyof ReturnType<typeof colors>;
  className?: string;
  children: ReactNode;
  outline?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "sky",
  className,
  outline = false,
  type = "button",
  onClick,
  disabled = false,
}) => {
  const dynamic = colors(outline)[variant];

  const merged = clsx(
    "text-white py-1.5 px-5 rounded-lg border-2 disabled:bg-slate-300 disabled:border-slate-300",
    dynamic,
    className,
    outline ? "bg-transparent" : ""
  );

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={merged}
    >
      {children}
    </button>
  );
};
