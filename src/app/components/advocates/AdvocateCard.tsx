"use client";

import { Advocate } from "@/types/advocate";
import { cardStyles, badgeStyles, cn } from "@/utils/styles";
import { useCallback } from "react";

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
            <svg 
              className="h-4 w-4 mr-2 text-neutral-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.3 10.3s-.132.274-.132.724c0 .636.247 1.245.7 1.698.452.453 1.062.7 1.698.7.45 0 .724-.132.724-.132l.913-3.924a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{formatPhoneNumber(advocate.phoneNumber)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
