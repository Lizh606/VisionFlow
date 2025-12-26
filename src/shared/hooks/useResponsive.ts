
import { useState, useEffect } from 'react';

/**
 * Breakpoints from VisionFlow UI Spec V1.4
 * Mobile: < 768
 * Tablet: 768 - 1199
 * Desktop: >= 1200
 */
const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1200;

export const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width >= MOBILE_BREAKPOINT && width < DESKTOP_BREAKPOINT;
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return {
    isMobile,
    isTablet,
    isDesktop,
    // V1.4: Sidebar should be collapsed on Mobile (if accessed) and Tablet
    shouldCollapseSidebar: width < DESKTOP_BREAKPOINT,
    width
  };
};
