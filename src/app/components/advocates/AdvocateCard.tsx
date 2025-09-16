"use client";

import { Advocate } from "@/types/advocate";
import { cardStyles, badgeStyles, cn } from "@/utils/styles";
import { useCallback } from "react";
import PhoneIcon from "../shared/icons/PhoneIcon";

interface AdvocateCardProps {
  advocate: Advocate;
  className?: string;
}

export default function AdvocateCard({ advocate, className = "" }: AdvocateCardProps) {
  const formatPhoneNumber = (phone: number): string => {
    const phoneStr = phone.toString();
    return phoneStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const formatYearsExperience = (years: number): string => {
    return years === 1 ? "1 year" : `${years} years`;
  };

  const handleCardClick = useCallback(() => {
    alert(`This would call ${advocate.firstName} ${advocate.lastName} at ${formatPhoneNumber(advocate.phoneNumber)} or open their details page.`);
  }, [advocate.firstName, advocate.lastName, advocate.phoneNumber]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  // Limit specialties display for more consistent card heights
  const maxVisibleSpecialties = 4;
  const visibleSpecialties = advocate.specialties.slice(0, maxVisibleSpecialties);
  const remainingCount = advocate.specialties.length - maxVisibleSpecialties;

  return (
    <div 
      className={cn(
        cardStyles.base, 
        "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "hover:shadow-lg focus:shadow-lg",
        "flex flex-col min-h-[200px]", // Minimum height with flexible growth
        "mr-3", // Add right margin on all sizes to avoid scrollbar collision
        className
      )}
      tabIndex={0}
      role="button"
      aria-label={`Contact ${advocate.firstName} ${advocate.lastName}, ${advocate.degree} in ${advocate.city}. Phone: ${formatPhoneNumber(advocate.phoneNumber)}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {/* Header section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 truncate">
            {advocate.firstName} {advocate.lastName}, {advocate.degree}
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            {advocate.city}
          </p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <span className={badgeStyles.primary}>
            {formatYearsExperience(advocate.yearsOfExperience)}
          </span>
        </div>
      </div>

      {/* Specialties section - flexible but controlled */}
      <div className="flex-1 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {visibleSpecialties.map((specialty, index) => (
            <span
              key={index}
              className={badgeStyles.neutral}
            >
              {specialty}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className={cn(badgeStyles.neutral, "bg-neutral-300 text-neutral-600 cursor-help")}
              title={`${remainingCount} more specialties: ${advocate.specialties.slice(maxVisibleSpecialties).join(', ')}`}
            >
              +{remainingCount} more
            </span>
          )}
        </div>
      </div>

      {/* Footer section - always at bottom with consistent spacing */}
      <div className="pt-4 border-t border-neutral-100 mt-auto">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <div className="flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2 text-neutral-400" />
            <span>{formatPhoneNumber(advocate.phoneNumber)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
