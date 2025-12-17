import { useState, useEffect } from 'react';

// Breakpoints from spec
const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

export const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width < MOBILE_BREAKPOINT,
    isTablet: width >= MOBILE_BREAKPOINT && width < DESKTOP_BREAKPOINT,
    isDesktop: width >= DESKTOP_BREAKPOINT,
    // Helping with layout logic
    shouldCollapseSidebar: width < DESKTOP_BREAKPOINT,
  };
};