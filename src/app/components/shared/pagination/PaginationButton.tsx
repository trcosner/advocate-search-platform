import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/styles";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, isActive = false, ...props }, ref) => {
    const baseStyles = `
      px-3 py-2 text-sm font-medium
      border border-neutral-400
      bg-white text-neutral-700
      hover:bg-neutral-500 hover:text-white
      disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
      focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      transition-colors duration-200
    `;

    const activeStyles = `
      bg-primary-600 text-white border-primary-600
      hover:bg-primary-700 hover:border-primary-700
    `;

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          isActive && activeStyles,
          className
        )}
        {...props}
      />
    );
  }
);

PaginationButton.displayName = "PaginationButton";

export default PaginationButton;
