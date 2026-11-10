import { style, styleVariants } from '@vanilla-extract/css';
import { normalPadding, secondaryRules } from './button.css.js';
import { vars } from './root.css.js';
import { colors } from './tokens.js';

export const input = style({
  boxSizing: 'border-box',
  maxInlineSize: '100%',
  font: 'inherit',
  lineHeight: 1.25,
  color: vars.color.text,
  backgroundColor: secondaryRules.backgroundColor,
  border: `1px solid color-mix(in srgb, ${vars.color.text} 30%, ${vars.color.border})`,
  borderRadius: '0.5em',
  selectors: {
    '&::placeholder': { color: `color-mix(in srgb, ${vars.color.text} 68%, transparent)` },
    '&[aria-invalid="true"]': { borderColor: `light-dark(${colors.red[8]}, ${colors.red[4]})` },
    '&:disabled': { opacity: 0.55, cursor: 'not-allowed' },
  },
});

export const paddings = styleVariants({
  fit: { blockSize: '1.5em', padding: 'calc(0.25em - 1px) 0.5em', lineHeight: 1, verticalAlign: 'baseline' },
  normal: normalPadding,
  custom: {},
});

export const inputLabel = style({
  display: 'inline-grid',
  gap: '0.375em',
  maxInlineSize: '100%',
});
