"use client";

import { Advocate } from "../../../types";
import Badge from "../shared/Badge";
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
      className={`
        bg-white border border-neutral-200 rounded-lg p-6
        hover:border-neutral-300 hover:shadow-lg 
        transition-all duration-200 ease-in-out
        cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        focus:shadow-lg
        flex flex-col min-h-[200px]
        mr-3
        ${className}
      `}
      tabIndex={0}
      role="button"
      aria-label={`Contact ${advocate.firstName} ${advocate.lastName}, ${advocate.degree} in ${advocate.city}. Phone: ${formatPhoneNumber(advocate.phoneNumber)}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {/* Header section */}
      <div className="mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 truncate">
            {advocate.firstName} {advocate.lastName}, {advocate.degree}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-neutral-600">
              {advocate.city}
            </p>
            <Badge variant="primary">
              {formatYearsExperience(advocate.yearsOfExperience)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Specialties section - flexible but controlled */}
      <div className="flex-1 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {visibleSpecialties.map((specialty, index) => (
            <Badge
              key={index}
              variant="neutral"
            >
              {specialty}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge
              variant="neutral"
              className="bg-neutral-300 text-neutral-600 cursor-help"
              title={`${remainingCount} more specialties: ${advocate.specialties.slice(maxVisibleSpecialties).join(', ')}`}
            >
              +{remainingCount} more
            </Badge>
          )}
        </div>
      </div>

      {/* Footer section - always at bottom with consistent spacing */}
      <div className="pt-4 border-t border-neutral-100 mt-auto">
        <div className="flex items-center text-sm text-neutral-600">
          <PhoneIcon className="h-4 w-4 mr-2 text-neutral-400" />
          <span>{formatPhoneNumber(advocate.phoneNumber)}</span>
        </div>
      </div>
    </div>
  );
}
