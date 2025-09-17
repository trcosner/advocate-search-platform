import { cn } from "@/utils/styles";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: `
    bg-primary-700 text-white rounded-lg
    hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed
    transition-colors duration-200
  `,
  secondary: `
    bg-white text-neutral-700 border border-neutral-300 rounded-lg
    hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
