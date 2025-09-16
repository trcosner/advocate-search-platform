import ErrorFallback from "../shared/ErrorFallback";

const AdvocateErrorFallback = ({ 
    error, 
    resetErrorBoundary 
  }: { 
    error: Error; 
    resetErrorBoundary: () => void 
  }) => (
    <ErrorFallback 
      error={error?.message || "Error"}
      resetErrorBoundary={resetErrorBoundary}
      title="Unable to load advocates"
      message="We're having trouble loading the advocate directory. Please check your connection and try again."
      buttonText="Reload Advocates"
    />
  );

  export default AdvocateErrorFallback