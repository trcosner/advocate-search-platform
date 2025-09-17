import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const inputStyles = `
      w-full border border-neutral-300 rounded-lg
      bg-white text-neutral-900 placeholder-neutral-500
      focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
      transition-colors duration-200
    `;

    return (
      <input
        ref={ref}
        className={`${inputStyles} ${className || ""}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
