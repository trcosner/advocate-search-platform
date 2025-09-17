"use client";

import Image from "next/image";

interface CloseIconProps {
  className?: string;
  onClick?: () => void;
}

export default function CloseIcon({ className = "h-4 w-4", onClick }: CloseIconProps) {
  return (
    <Image
      src="/icons/close.svg"
      alt="Close"
      width={16}
      height={16}
      className={className}
      onClick={onClick}
    />
  );
}
