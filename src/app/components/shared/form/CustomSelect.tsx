"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/utils/styles";
import { useTabTrap } from "../../../../hooks/useTabTrap";

interface Option {
  value: string | undefined;
  label: string;
}

interface CustomSelectProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = ""
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useTabTrap({ 
    isActive: isOpen, 
    onEscape: () => setIsOpen(false) 
  });

  const selectedOption = options.find(option => option.value === value);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
  }, [disabled, isOpen]);

  const handleSelect = useCallback((optionValue: string | undefined) => {
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [onChange]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, [dropdownRef]);

  useEffect(() => {
    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Handle keyboard navigation within the dropdown
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          e.stopPropagation();
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          e.stopPropagation();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          e.stopPropagation();
          if (focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          }
          break;
      }
    };

    if (isOpen) {
      // Use capture phase to ensure we handle events before other listeners
      document.addEventListener('keydown', handleKeyDownCapture, { capture: true });
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDownCapture, { capture: true });
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, focusedIndex, options, handleSelect, handleClickOutside]);

  useEffect(() => {
    if (isOpen) {
      // Set focused index to current selection or first item
      const currentIndex = value ? options.findIndex(opt => opt.value === value) : 0;
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [isOpen, value, options]);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "w-full appearance-none bg-white border border-neutral-300 rounded-lg",
          "px-3 py-2 text-sm font-medium text-neutral-700 text-left",
          "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
          "transition-colors duration-200",
          "flex items-center justify-between"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!selectedOption ? "text-neutral-500" : ""}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={cn(
            "h-4 w-4 text-neutral-400 transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <ul role="listbox" className="py-1">
            {options.map((option, index) => (
              <li key={option.value || 'empty'} role="option" aria-selected={option.value === value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors",
                    option.value === value
                      ? "bg-primary-100 text-primary-900 font-medium"
                      : "text-neutral-700 hover:bg-neutral-50",
                    index === focusedIndex && "bg-primary-50",
                    "focus:outline-none focus:bg-primary-50"
                  )}
                  tabIndex={0}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
