import { cn } from "@/utils/styles";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const basePaginationStyles = `
  px-3 py-2 text-sm font-medium
  border border-neutral-400
  bg-white text-neutral-700
  hover:bg-neutral-500 hover:text-white
  disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
  transition-colors duration-200
`;

const activePaginationStyles = `
  bg-primary-600 text-primary-500 border-primary-600
  hover:bg-primary-700 hover:border-primary-700
`;

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ isActive = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          basePaginationStyles,
          isActive && activePaginationStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PaginationButton.displayName = "PaginationButton";

export default PaginationButton;
