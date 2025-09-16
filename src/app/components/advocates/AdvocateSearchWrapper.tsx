"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import ErrorFallback from "../shared/ErrorFallback";
import AdvocateSearchClient from "./AdvocateSearchClient";
import { AdvocateSearchParams, PaginatedResult, Advocate } from "../../../types/api";

interface AdvocateSearchWrapperProps {
  initialData?: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

export default function AdvocateSearchWrapper({
  initialData,
  initialSearchParams
}: AdvocateSearchWrapperProps) {
  // Custom error fallback for advocate search
  const AdvocateErrorFallback = ({ 
    error, 
    resetErrorBoundary 
  }: { 
    error: Error; 
    resetErrorBoundary: () => void 
  }) => (
    <ErrorFallback 
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      title="Unable to load advocates"
      message="We're having trouble loading the advocate directory. Please check your connection and try again."
      buttonText="Reload Advocates"
    />
  );

  return (
    <ErrorBoundary fallback={AdvocateErrorFallback}>
      <Suspense fallback={
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="text-center">
            <div className="animate-pulse text-neutral-600 text-sm sm:text-base">
              Loading advocates...
            </div>
          </div>
        </div>
      }>
        <AdvocateSearchClient 
          initialData={initialData}
          initialSearchParams={initialSearchParams}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
