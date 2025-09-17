"use client";

import { useEffect } from "react";
import ErrorFallback from "./components/shared/ErrorFallback";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorFallback
      error={error.message}
      resetErrorBoundary={reset}
      title="Something went wrong"
      message="We encountered an unexpected error while loading the advocate search. Please try again."
      buttonText="Try Again"
    />
  );
}
