"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseTabTrapOptions {
  isActive: boolean;
  onEscape?: () => void;
  autoFocus?: boolean;
  excludeSelector?: string;
}

export function useTabTrap({ isActive, onEscape, autoFocus = true, excludeSelector }: UseTabTrapOptions) {
  const trapRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!trapRef.current) return [];
    
    const selector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";
    let elements = Array.from(trapRef.current.querySelectorAll(selector)) as HTMLElement[];
    
    // Filter out excluded elements
    if (excludeSelector) {
      elements = elements.filter(el => !el.matches(excludeSelector));
    }
    
    return elements;
  }, [excludeSelector]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      onEscape?.();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    // Only trap if we're at the boundaries
    if (e.shiftKey && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
    // Otherwise, let the browser handle normal tab navigation
  }, [isActive, onEscape, getFocusableElements]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isActive && autoFocus && trapRef.current) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isActive, autoFocus, getFocusableElements]);

  return trapRef;
}