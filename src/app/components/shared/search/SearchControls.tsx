"use client";

import SearchInput from "./SearchInput";

interface SearchControlsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  searchPlaceholder?: string;
  searchLoading?: boolean;
  searchDisabled?: boolean;
  className?: string;
}

export default function SearchControls({
  searchValue,
  onSearchChange,
  onSearch,
  onClear,
  searchPlaceholder = "Search...",
  searchLoading = false,
  searchDisabled = false,
  className = ""
}: SearchControlsProps) {
  
  return (
    <div className={`${className}`}>
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        onSearch={onSearch}
        onClear={onClear}
        placeholder={searchPlaceholder}
        loading={searchLoading}
        disabled={searchDisabled}
      />
    </div>
  );
}
