import { BREAKPOINTS } from '../constants/theme';

export const createResponsiveStyle = (
  property: string,
  mobileValue: string,
  tabletValue: string,
  desktopValue: string
): React.CSSProperties => {
  return {
    [property]: `clamp(${mobileValue}, ${tabletValue}, ${desktopValue})`
  };
};

export const getResponsiveFontSize = (minSize: number, maxSize: number): string => {
  return `clamp(${minSize}px, ${(minSize + maxSize) / 2 * 0.2}vw, ${maxSize}px)`;
};

export const getResponsivePadding = (minPadding: number, maxPadding: number): string => {
  return `clamp(${minPadding}px, ${(minPadding + maxPadding) / 2 * 0.25}vw, ${maxPadding}px)`;
};

export const getResponsiveMargin = (minMargin: number, maxMargin: number): string => {
  return `clamp(${minMargin}px, ${(minMargin + maxMargin) / 2 * 0.25}vw, ${maxMargin}px)`;
};

export const fadeInUpAnimation = (delay: number = 0): React.CSSProperties => ({
  animation: `fadeInUp 0.8s ease-out ${delay}s forwards`,
  opacity: 0,
  transform: 'translateY(30px)'
});

export const slideInUpAnimation = (delay: number = 0): React.CSSProperties => ({
  animation: `slideInUp 0.6s ease-out ${delay}s forwards`,
  opacity: 0,
  transform: 'translateY(20px)'
});

export const mediaQuery = {
  mobile: `@media (max-width: ${BREAKPOINTS.MOBILE})`,
  tablet: `@media (min-width: ${parseInt(BREAKPOINTS.MOBILE) + 1}px) and (max-width: ${BREAKPOINTS.TABLET})`,
  desktop: `@media (min-width: ${parseInt(BREAKPOINTS.TABLET) + 1}px)`
};

export const commonTransitions = {
  fast: 'all 0.15s ease',
  normal: 'all 0.3s ease',
  slow: 'all 0.5s ease'
};

export const zIndexLevels = {
  base: 0,
  dropdown: 10,
  sticky: 100,
  modal: 1000,
  popover: 2000,
  tooltip: 3000
} as const;