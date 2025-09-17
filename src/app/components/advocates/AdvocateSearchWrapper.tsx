"use client";

import React from "react";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import AdvocateSearchClient from "./AdvocateSearchClient";
import { AdvocateSearchParams, PaginatedResult, Advocate } from "../../../types/api";
import ErrorFallback from "../shared/ErrorFallback";


interface AdvocateSearchWrapperProps {
  initialData?: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

export default function AdvocateSearchWrapper({
  initialData,
  initialSearchParams
}: AdvocateSearchWrapperProps) {

  return (
    <ErrorBoundary fallback={({ error, resetErrorBoundary }) => (
      <ErrorFallback 
        error={error.message}
        resetErrorBoundary={resetErrorBoundary}
        title="Unable to load advocates"
        message="We're having trouble loading the advocate directory. Please check your connection and try again."
        buttonText="Reload Advocates"
      />
    )}>
      <AdvocateSearchClient 
        initialData={initialData}
        initialSearchParams={initialSearchParams}
      />
    </ErrorBoundary>
  );
}
