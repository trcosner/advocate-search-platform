"use client";

import { useState, useEffect, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { cn } from "@/utils/styles";
import Button from "../Button";
import Input from "../form/Input";
import CloseIcon from "../icons/CloseIcon";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
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
  loading = false,
  disabled = false,
  className = ""
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  // Update input when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Update parent state but don't trigger search
  }, [onChange]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setInputValue("");
    onClear();
  }, [onClear]);

  const showClear = value.length > 0 && !loading;

  return (
    <div className={`relative flex gap-3 ${className}`}>
      <div className="relative flex-1">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={cn(
            "text-sm font-medium px-4 py-2.5",
            showClear ? "pr-10" : "pr-4"
          )}
          aria-label="Search input"
        />

        {showClear && !loading && (
          <button
            onClick={handleClear}
            disabled={disabled}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Clear search"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}

        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      <Button
        onClick={onSearch}
        disabled={disabled || loading}
        variant="primary"
        size="md"
        className="whitespace-nowrap"
        aria-label="Search"
      >
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}
