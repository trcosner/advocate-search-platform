"use client";

import Image from "next/image";

interface ChevronRightIconProps {
  className?: string;
  onClick?: () => void;
}

export default function ChevronRightIcon({ className = "h-4 w-4", onClick }: ChevronRightIconProps) {
  return (
    <Image
      src="/icons/chevron-right.svg"
      alt="Next"
      width={16}
      height={16}
      className={className}
      onClick={onClick}
    />
  );
}
