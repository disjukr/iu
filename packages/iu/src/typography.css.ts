import { style, styleVariants } from '@vanilla-extract/css';
import { typography } from './tokens.js';

export const typographyElement = style({ margin: 0 });

export const headingMargins = { marginBlockStart: '1em', marginBlockEnd: '0.5em' };
export const paragraphMargins = { marginBlockStart: 0, marginBlockEnd: '0.5em' };
export const headingSpacing = style({
  ...headingMargins,
  selectors: {
    '&:first-child': { marginBlockStart: 0 },
    '&:last-child': { marginBlockEnd: 0 },
  },
});
export const paragraphSpacing = style({
  ...paragraphMargins,
  selectors: { '&:last-child': { marginBlockEnd: 0 } },
});

export const headingPresets = {
  xs: { fontSize: '1rem', lineHeight: 1.4, letterSpacing: 'normal', fontWeight: 600 },
  sm: { fontSize: '1.25rem', lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 600 },
  md: { fontSize: '1.5rem', lineHeight: 1.3, letterSpacing: '-0.015em', fontWeight: 600 },
  lg: { fontSize: '2rem', lineHeight: 1.25, letterSpacing: '-0.02em', fontWeight: 600 },
  xl: { fontSize: '2.5rem', lineHeight: 1.2, letterSpacing: '-0.025em', fontWeight: 600 },
};

const textMetrics = { lineHeight: typography.lineHeight, letterSpacing: 'normal' };
export const textPresets = {
  xs: { ...textMetrics, fontSize: '0.75rem' },
  sm: { ...textMetrics, fontSize: '0.875rem' },
  md: { ...textMetrics, fontSize: '1rem' },
  lg: { ...textMetrics, fontSize: '1.125rem' },
  xl: { ...textMetrics, fontSize: '1.25rem' },
};

export const headingSizes = styleVariants(headingPresets);
export const textSizes = styleVariants(textPresets);
