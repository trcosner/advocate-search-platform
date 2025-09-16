import { buttonStyles, cn } from "@/utils/styles";

interface ErrorFallbackProps {
  error: string;
  resetErrorBoundary: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export default function ErrorFallback({ 
  error, 
  resetErrorBoundary,
  title = "Something went wrong",
  message = "We're having trouble loading this content. Please try again.",
  buttonText = "Try Again"
}: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={resetErrorBoundary}
          className={cn(
            buttonStyles.primary,
            "text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 min-w-[120px]"
          )}
          type="button"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
