"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/app/utils/styles";
import { useTabTrap } from "../../../hooks/useTabTrap";
import ChevronDownIcon from "../icons/ChevronDownIcon";

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
    onEscape: () => setIsOpen(false),
    autoFocus: true,
    excludeSelector: '[data-trigger="true"]' // Exclude the trigger button from tab trap
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
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isOpen) {
      // Set focused index to current selection or first item
      const currentIndex = value ? options.findIndex(opt => opt.value === value) : 0;
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [isOpen, value, options]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        data-trigger="true"
        className="w-full appearance-none bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 text-left focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!selectedOption ? "text-neutral-500" : ""}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDownIcon 
          className={cn(
            "h-4 w-4 text-neutral-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <ul role="listbox" className="py-1">
            {options.map((option, index) => (
              <li key={option.value || 'empty'} role="option" aria-selected={option.value === value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  onFocus={() => setFocusedIndex(index)}
                  onKeyDown={(e) => {
                    switch (e.key) {
                      case 'Enter':
                      case ' ':
                        e.preventDefault();
                        handleSelect(option.value);
                        break;
                      case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = index < options.length - 1 ? index + 1 : 0;
                        const nextButton = dropdownRef.current?.querySelectorAll('button:not([data-trigger="true"])')[nextIndex] as HTMLButtonElement;
                        if (nextButton) nextButton.focus();
                        break;
                      case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = index > 0 ? index - 1 : options.length - 1;
                        const prevButton = dropdownRef.current?.querySelectorAll('button:not([data-trigger="true"])')[prevIndex] as HTMLButtonElement;
                        if (prevButton) prevButton.focus();
                        break;
                    }
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors",
                    option.value === value
                      ? "bg-primary-100 text-primary-900 font-medium"
                      : "text-neutral-700 hover:bg-neutral-50",
                    index === focusedIndex && "bg-primary-50 ring-2 ring-primary-200",
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
