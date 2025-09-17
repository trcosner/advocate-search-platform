import { PageLoadingSpinner } from "./components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <PageLoadingSpinner message="Loading advocates..." />
      </div>
    </div>
  );
}