
export const buttonStyles = {
  primary: `
    bg-primary-600 text-white rounded-lg
    hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed
    transition-colors duration-200
  `,
  secondary: `
    bg-white text-neutral-700 border border-neutral-300 rounded-lg
    hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `,
  pagination: `
    px-3 py-2 text-sm font-medium
    border border-neutral-400
    bg-white text-neutral-700
    hover:bg-neutral-500 hover:text-white
    disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
    focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    transition-colors duration-200
  `,
  paginationActive: `
    bg-primary-600 text-primary-500 border-primary-600
    hover:bg-primary-700 hover:border-primary-700
  `
};

// Card styling utilities
export const cardStyles = {
  base: `
    bg-white border border-neutral-200 rounded-lg p-6 
    hover:border-neutral-300 hover:shadow-md 
    transition-all duration-200 ease-in-out
  `,
  compact: `
    bg-white border border-neutral-200 rounded-lg p-4 
    hover:border-neutral-300 hover:shadow-sm 
    transition-all duration-200 ease-in-out
  `
};

// Skeleton styling utilities
export const skeletonStyles = {
  base: `animate-pulse bg-neutral-200 rounded`,
  rect: (width?: string) => `h-4 bg-neutral-200 rounded ${width || 'w-full'}`,
  circle: (size?: string) => `bg-neutral-200 rounded-full ${size || 'h-4 w-4'}`,
  badge: `h-6 bg-neutral-200 rounded-full`,
  input: `h-10 bg-neutral-200 rounded-lg`,
  button: `h-10 bg-neutral-200 rounded-lg`
};

// Badge styling utilities
export const badgeStyles = {
  primary: `
    inline-flex items-center px-2.5 py-1 rounded-full 
    text-xs font-medium bg-primary-100 text-primary-800
  `,
  neutral: `
    inline-flex items-center px-2 py-1 rounded 
    text-xs font-medium bg-neutral-100 text-neutral-700
  `,
  small: `
    inline-flex items-center px-2 py-1 rounded 
    text-xs font-medium
  `
};

// Input styling utilities
export const inputStyles = {
  base: `
    w-full border border-neutral-300 rounded-lg
    bg-white text-neutral-900 placeholder-neutral-500
    focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `,
  withIcon: `pl-10 pr-10 py-2.5`,
  select: `
    appearance-none bg-white border border-neutral-300 rounded-lg
    px-3 py-2 text-sm font-medium text-neutral-700
    focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `
};

// Utility function to combine classes and remove extra whitespace
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
