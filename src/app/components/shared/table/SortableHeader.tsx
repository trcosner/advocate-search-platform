"use client";

interface SortableHeaderProps {
  field: string;
  label: string;
  currentSort?: string;
  currentOrder?: 'asc' | 'desc';
  onSort: (field: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function SortableHeader({
  field,
  label,
  currentSort,
  currentOrder,
  onSort,
  className = "",
  disabled = false
}: SortableHeaderProps) {
  const isActive = currentSort === field;
  const sortIcon = isActive 
    ? (currentOrder === 'asc' ? '↑' : '↓')
    : '';

  const handleClick = () => {
    if (!disabled) {
      onSort(field);
    }
  };

  return (
    <th 
      className={`
        px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-neutral-100'}
        ${isActive ? 'bg-primary-50 text-primary-700' : 'bg-neutral-50'}
        border-b border-neutral-200
        select-none transition-colors duration-200
        ${className}
      `}
      onClick={handleClick}
      role="columnheader"
      aria-sort={
        isActive 
          ? (currentOrder === 'asc' ? 'ascending' : 'descending')
          : 'none'
      }
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          onSort(field);
        }
      }}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {sortIcon && (
          <span className="text-primary-600 font-bold" aria-hidden="true">
            {sortIcon}
          </span>
        )}
        {!isActive && (
          <span className="text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
            ↕
          </span>
        )}
      </div>
    </th>
  );
}
