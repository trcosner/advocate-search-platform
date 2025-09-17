"use client";

import { ErrorBoundary } from "../shared/ErrorBoundary";
import AdvocateSearchClient from "./AdvocateSearchClient";
import ErrorFallback from "../shared/ErrorFallback";
import { AdvocateSearchParams, PaginatedResult, Advocate } from "../../../types/api";

interface AdvocateSearchPageProps {
  initialData?: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

function AdvocateErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error; 
  resetErrorBoundary: () => void 
}) {
  return (
    <ErrorFallback 
      error={error.message}
      resetErrorBoundary={resetErrorBoundary}
      title="Unable to load advocates"
      message="We're having trouble loading the advocate directory. Please check your connection and try again."
      buttonText="Reload Advocates"
    />
  );
}

export default function AdvocateSearchPage({
  initialData,
  initialSearchParams
}: AdvocateSearchPageProps) {
  return (
    <ErrorBoundary fallback={AdvocateErrorFallback}>
      <AdvocateSearchClient 
        initialData={initialData}
        initialSearchParams={initialSearchParams}
      />
    </ErrorBoundary>
  );
}
