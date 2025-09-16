"use client";

import { useState, useEffect, useCallback, ChangeEvent, KeyboardEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  debounceMs?: number;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search...",
  debounceMs = 300,
  loading = false,
  disabled = false,
  className = ""
}: SearchInputProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedValue !== value) {
        onChange(debouncedValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [debouncedValue, debounceMs, onChange, value]);

  // Update local value when external value changes
  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDebouncedValue(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setDebouncedValue("");
    onClear();
  }, [onClear]);

  const showClear = value.length > 0 && !loading;

  return (
    <div className={`relative flex gap-3 ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        </div>
        
        <input
          type="text"
          value={debouncedValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || loading}
          className="
            w-full pl-10 pr-10 py-2.5 
            border border-neutral-300 rounded-lg
            bg-white text-neutral-900 placeholder-neutral-500
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
            transition-colors duration-200
            text-sm font-medium
          "
          aria-label="Search input"
        />

        {/* Clear Button */}
        {showClear && (
          <button
            onClick={handleClear}
            disabled={disabled}
            className="
              absolute inset-y-0 right-0 pr-3 flex items-center
              text-neutral-400 hover:text-neutral-600
              disabled:cursor-not-allowed
              transition-colors duration-200
            "
            aria-label="Clear search"
          >
          </button>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={disabled || loading}
        className="btn-primary px-4 py-2.5 text-sm font-medium whitespace-nowrap"
        aria-label="Search"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Clear All Button */}
      {showClear && (
        <button
          onClick={handleClear}
          disabled={disabled || loading}
          className="btn-secondary px-4 py-2.5 text-sm font-medium whitespace-nowrap"
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
}
