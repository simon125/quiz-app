import clsx from "clsx";
import { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = "" }) => {
  const finalClass = clsx(
    "bg-zinc-50 p-5 sm:p-6 rounded-lg shadow-lg",
    className
  );
  return <section className={finalClass}>{children}</section>;
};
