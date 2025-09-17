"use client";

import Image from "next/image";

interface PhoneIconProps {
  className?: string;
  onClick?: () => void;
}

export default function PhoneIcon({ className = "h-4 w-4", onClick }: PhoneIconProps) {
  return (
    <Image
      src="/icons/phone.svg"
      alt="Phone"
      width={16}
      height={16}
      className={className}
      onClick={onClick}
    />
  );
}
