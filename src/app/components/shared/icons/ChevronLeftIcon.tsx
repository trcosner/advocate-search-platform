"use client";

import Image from "next/image";

interface ChevronLeftIconProps {
  className?: string;
  onClick?: () => void;
}

export default function ChevronLeftIcon({ className = "h-4 w-4", onClick }: ChevronLeftIconProps) {
  return (
    <Image
      src="/icons/chevron-left.svg"
      alt="Previous"
      width={16}
      height={16}
      className={className}
      onClick={onClick}
    />
  );
}
