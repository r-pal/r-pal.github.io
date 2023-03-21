import clsx from "clsx";

type ButtonProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  variant?: boolean;
  form?: string;
  disabled?: boolean;
  header?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  form,
  type,
  disabled,
  header,
}) => (
  <button
    className={clsx(
      "text-sm focus:ring-cyan-500 text-[#3A3042] hover:bg-[#EDFFD9]/50 p-1 rounded",
      variant ? "text-[#EDFFD9]" : " bg-[#EDFFD9]"
    )}
    form={form}
    type={type}
    disabled={disabled}
  >
    {header ? <h1 className="text-[#3A3042]  xl:text-4xl">{text}</h1> : text}
  </button>
);

export default Button;
