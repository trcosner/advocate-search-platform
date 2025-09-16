"use client";

import React from "react";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import AdvocateSearchClient from "./AdvocateSearchClient";
import { AdvocateSearchParams, PaginatedResult, Advocate } from "../../../types/api";
import AdvocateErrorFallback from "./AdvocateErrorFallback";


interface AdvocateSearchWrapperProps {
  initialData?: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

export default function AdvocateSearchWrapper({
  initialData,
  initialSearchParams
}: AdvocateSearchWrapperProps) {

  return (
    <ErrorBoundary fallback={AdvocateErrorFallback}>
      <AdvocateSearchClient 
        initialData={initialData}
        initialSearchParams={initialSearchParams}
      />
    </ErrorBoundary>
  );
}
