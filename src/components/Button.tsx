import clsx from "clsx";
import { Faders } from "phosphor-react";

type ButtonProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  variant?: boolean;
  form?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  form,
  type,
  disabled,
}) => {
  return (
    <button
      className={clsx(
        "text-sm focus:ring-cyan-500 text-[#3A3042] hover:bg-[#EDFFD9]/50 p-1 rounded-full",
        variant ? "text-[#EDFFD9]" : " bg-[#EDFFD9]"
      )}
      form={form}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
