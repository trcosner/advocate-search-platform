"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12'
};

export default function LoadingSpinner({ 
  size = 'md', 
  message = 'Loading...',
  className = ''
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-neutral-200 border-t-primary-600`}
        role="status"
        aria-label={message}
      />
      {message && (
        <span className="text-sm text-neutral-600 font-medium">
          {message}
        </span>
      )}
    </div>
  );
}

// Convenience component for page-level loading
export function PageLoadingSpinner({ message = 'Loading advocates...' }: { message?: string }) {
  return (
    <div className="h-64 flex items-center justify-center">
      <LoadingSpinner size="lg" message={message} />
    </div>
  );
}

// Convenience component for inline loading
export function InlineLoadingSpinner({ message }: { message?: string }) {
  return <LoadingSpinner size="sm" message={message} className="py-2" />;
}
