import { InputHTMLAttributes, forwardRef, KeyboardEvent } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onKeyDown, type, ...props }, ref) => {
    const inputStyles = `
      w-full border border-neutral-300 rounded-lg
      bg-white text-neutral-900 placeholder-neutral-500
      focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
      transition-colors duration-200
    `;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // For number inputs, let arrow keys work naturally without losing focus
      if (type === 'number' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        // Allow default behavior (increment/decrement) but prevent any additional handling
        // that might cause re-renders and focus loss
        e.stopPropagation();
      }
      
      onKeyDown?.(e);
    };

    return (
      <input
        ref={ref}
        type={type}
        className={`${inputStyles} ${className || ""}`}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
