import { HTMLAttributes } from "react";

type BadgeVariant = "primary" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const badgeVariants = {
  primary: `
    inline-flex items-center px-2.5 py-1 rounded-full 
    text-xs font-medium bg-primary-100 text-primary-800
  `,
  neutral: `
    inline-flex items-center px-2 py-1 rounded 
    text-xs font-medium bg-neutral-100 text-neutral-700
  `
};

export default function Badge({ variant = "primary", children, className, ...props }: BadgeProps) {
  return (
    <span className={`${badgeVariants[variant]} ${className || ""}`} {...props}>
      {children}
    </span>
  );
}
