import { ButtonHTMLAttributes, forwardRef } from "react";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, isActive = false, ...props }, ref) => {
    const baseClasses = "px-3 py-2 text-sm font-medium border transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:border-neutral-300";
    
    const stateClasses = isActive 
      ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 hover:border-primary-700' 
      : 'bg-white text-neutral-700 border-neutral-400 hover:bg-neutral-500 hover:text-white focus:border-primary-500';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${className || ''}`}
        {...props}
      />
    );
  }
);

PaginationButton.displayName = "PaginationButton";

export default PaginationButton;
