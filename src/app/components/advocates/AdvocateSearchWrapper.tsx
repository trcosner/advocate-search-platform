"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import AdvocateSearchClient from "./AdvocateSearchClient";
import { AdvocateSearchParams, PaginatedResult, Advocate } from "../../../types/api";
import AdvocateErrorFallback from "./AdvocateErrorFallback";
import AdvocateSearchSkeleton from "./AdvocateSearchSkeleton";


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
      <Suspense fallback={<AdvocateSearchSkeleton />}>
        <AdvocateSearchClient 
          initialData={initialData}
          initialSearchParams={initialSearchParams}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
