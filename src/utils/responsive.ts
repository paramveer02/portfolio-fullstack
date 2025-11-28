/**
 * Responsive Utilities
 * Helper functions for responsive design and breakpoint management
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Check if window is defined (for SSR compatibility)
 */
export const isClient = typeof window !== "undefined";

/**
 * Get current window width
 */
export const getWindowWidth = (): number => {
  return isClient ? window.innerWidth : 0;
};

/**
 * Check if viewport matches breakpoint
 */
export const isBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
  if (!isClient) return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

/**
 * Get responsive value based on current breakpoint
 */
export const getResponsiveValue = <T>(values: {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}): T => {
  if (!isClient) return values.base;

  const width = window.innerWidth;

  if (width >= breakpoints["2xl"] && values["2xl"] !== undefined)
    return values["2xl"];
  if (width >= breakpoints.xl && values.xl !== undefined) return values.xl;
  if (width >= breakpoints.lg && values.lg !== undefined) return values.lg;
  if (width >= breakpoints.md && values.md !== undefined) return values.md;
  if (width >= breakpoints.sm && values.sm !== undefined) return values.sm;

  return values.base;
};

/**
 * Get card dimensions based on viewport
 * Used for Stack component
 */
export const getCardDimensions = (): { width: number; height: number } => {
  if (!isClient) {
    return { width: 650, height: 650 };
  }

  const width = window.innerWidth;

  if (width < breakpoints.sm) {
    return { width: 300, height: 300 };
  } else if (width < breakpoints.md) {
    return { width: 400, height: 400 };
  } else if (width < breakpoints.lg) {
    return { width: 500, height: 500 };
  }

  return { width: 650, height: 650 };
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  if (!isClient) return false;
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if device is tablet
 */
export const isTablet = (): boolean => {
  if (!isClient) return false;
  const width = window.innerWidth;
  return width >= breakpoints.sm && width < breakpoints.lg;
};

/**
 * Check if device is desktop
 */
export const isDesktop = (): boolean => {
  if (!isClient) return false;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Get device type
 */
export const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (isMobile()) return "mobile";
  if (isTablet()) return "tablet";
  return "desktop";
};

/**
 * Debounce function for resize handlers
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Hook-like function to use with resize events
 */
export const onResize = (callback: () => void, delay = 150) => {
  if (!isClient) return () => {};

  const debouncedCallback = debounce(callback, delay);
  window.addEventListener("resize", debouncedCallback);

  return () => {
    window.removeEventListener("resize", debouncedCallback);
  };
};
