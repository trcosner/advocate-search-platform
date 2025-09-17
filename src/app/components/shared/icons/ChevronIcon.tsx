"use client";

import Image from "next/image";

interface ChevronIconProps {
  direction: 'up' | 'down' | 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

export default function ChevronIcon({ 
  direction, 
  className = "h-4 w-4", 
  onClick 
}: ChevronIconProps) {
  const rotationClass = {
    up: 'rotate-180',
    down: 'rotate-0', 
    left: 'rotate-90',
    right: '-rotate-90'
  }[direction];

  return (
    <Image
      src="/icons/chevron.svg"
      alt={`Chevron ${direction}`}
      width={16}
      height={16}
      className={`${className} ${rotationClass} transition-transform`}
      onClick={onClick}
    />
  );
}
