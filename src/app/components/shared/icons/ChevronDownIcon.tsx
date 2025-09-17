"use client";

import Image from "next/image";

interface ChevronDownIconProps {
  className?: string;
  onClick?: () => void;
}

export default function ChevronDownIcon({ className = "h-4 w-4", onClick }: ChevronDownIconProps) {
  return (
    <Image
      src="/icons/chevron-down.svg"
      alt="Expand"
      width={16}
      height={16}
      className={className}
      onClick={onClick}
    />
  );
}
