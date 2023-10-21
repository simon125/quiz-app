import clsx from "clsx";
import { FC, InputHTMLAttributes } from "react";

interface TextFieldProps {
  labelClassName?: string;
  inputClassName?: string;
  value?: string;
  label?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  type?: "text" | "mail" | "password";
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
  labelClassName,
  inputClassName,
  label,
  onChange,
  type = "text",
  placeholder,
  name,
  disabled = false,
  required = false,
}) => {
  return (
    <label className={clsx("w-full", labelClassName)}>
      {!!label && (
        <span className="text-sky-700 text-sm mb-1 block">{label}</span>
      )}
      <input
        disabled={disabled}
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "w-full p-2 bg-white border-blue-300 border rounded-md outline-sky-500 text-sky-900",
          inputClassName
        )}
      />
    </label>
  );
};
