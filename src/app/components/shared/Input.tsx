import { cn } from "@/utils/styles";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Could add variants here in the future if needed
}

const inputStyles = `
  w-full border border-neutral-300 rounded-lg
  bg-white text-neutral-900 placeholder-neutral-500
  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
  disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
  transition-colors duration-200
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputStyles, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
