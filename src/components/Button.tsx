import clsx from "clsx";
import { Faders } from "phosphor-react";

type ButtonProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  variant?: boolean;
  form?: string;
  settings?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  form,
  type,
  settings,
}) => {
  return (
    <button
      className={clsx(
        "group relative inline-block text-sm focus:outline-none hover:ring-cyan-500 text-[#3A3042] hover:bg-[#EDFFD9]/20",
        "block px-5 py-3 rounded-full transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 ",
        variant ? "text-[#EDFFD9]" : "text-[#3A3042]",
        variant ? "border border-[#EDFFD9]" : "bg-[#EDFFD9]"
      )}
      form={form}
      type={type}
    >
      {text}
      {settings && <Faders size={24} className="text-[#3A3042]" />}
    </button>
  );
};

export default Button;
