import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { focusRing, vars } from './root.css.js';
import { colors } from './tokens.js';
import { alpha } from './color.js';

export const button = style([focusRing, {
  appearance: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5em',
  boxSizing: 'border-box',
  margin: 0,
  border: '1px solid transparent',
  borderRadius: '0.5em',
  font: 'inherit',
  fontWeight: 500,
  lineHeight: 1.25,
  textDecoration: 'none',
  verticalAlign: 'middle',
  cursor: 'pointer',
  transition: 'background-color 150ms, box-shadow 150ms, transform 150ms',
  selectors: {
    '&:active:not(:disabled)': { transform: 'translateY(0.0625em)' },
    '&:disabled': { opacity: 0.45, cursor: 'not-allowed', boxShadow: 'none' },
  },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
}]);

export const variants = styleVariants({
  primary: {
    color: `light-dark(${colors.gray[0]}, ${colors.gray[9]})`,
    background: `linear-gradient(145deg, light-dark(${colors.gray[8]}, ${colors.gray[0]}), light-dark(${colors.gray[9]}, ${colors.blue[0]}))`,
    borderColor: `light-dark(${alpha(colors.white, 0.2)}, ${alpha(colors.white, 0.6)})`,
    boxShadow: `0 0.25em 0.75em ${alpha(colors.blue[9], 0.14)}, inset 0 1px 0 ${alpha(colors.white, 0.16)}`,
    selectors: { '&:hover:not(:disabled)': { background: `linear-gradient(145deg, light-dark(${colors.gray[7]}, ${colors.white}), light-dark(${colors.gray[8]}, ${colors.gray[0]}))` } },
  },
  secondary: {
    color: vars.color.text,
    backgroundColor: alpha(colors.blue[2], 0.08),
    borderColor: 'color-mix(in srgb, currentColor 18%, transparent)',
    boxShadow: `inset 0 1px 0 ${alpha(colors.white, 0.15)}`,
    WebkitBackdropFilter: `blur(${vars.glass.blur})`,
    backdropFilter: `blur(${vars.glass.blur})`,
    selectors: { '&:hover:not(:disabled)': { backgroundColor: alpha(colors.blue[3], 0.18) } },
  },
  ghost: {
    color: vars.color.text,
    backgroundColor: 'transparent',
    selectors: { '&:hover:not(:disabled)': { backgroundColor: alpha(colors.blue[3], 0.14) } },
  },
  warning: {
    color: colors.gray[9],
    background: `linear-gradient(145deg, ${alpha(colors.orange[1], 0.94)}, ${alpha(colors.orange[2], 0.96)})`,
    borderColor: alpha(colors.orange[4], 0.3),
    boxShadow: `0 0.25em 0.75em ${alpha(colors.orange[9], 0.14)}, inset 0 1px 0 ${alpha(colors.orange[0], 0.6)}`,
    WebkitBackdropFilter: `blur(${vars.glass.blur})`,
    backdropFilter: `blur(${vars.glass.blur})`,
    selectors: { '&:hover:not(:disabled)': { background: `linear-gradient(145deg, ${alpha(colors.orange[2], 0.94)}, ${alpha(colors.orange[3], 0.96)})` } },
  },
  danger: {
    color: colors.red[0],
    background: `linear-gradient(145deg, ${alpha(colors.red[9], 0.94)}, ${alpha(colors.red[9], 0.98)})`,
    borderColor: alpha(colors.red[2], 0.3),
    boxShadow: `0 0.25em 0.75em ${alpha(colors.red[9], 0.14)}, inset 0 1px 0 ${alpha(colors.red[0], 0.2)}`,
    WebkitBackdropFilter: `blur(${vars.glass.blur})`,
    backdropFilter: `blur(${vars.glass.blur})`,
    selectors: { '&:hover:not(:disabled)': { background: `linear-gradient(145deg, ${colors.red[9]}, ${colors.red[9]})` } },
  },
});

export const tint = createVar();

// Anchor custom fills to a contrasting neutral surface in either color scheme.
export const customFilled = style({
  color: `light-dark(${colors.gray[0]}, ${colors.gray[9]})`,
  background: `linear-gradient(145deg, color-mix(in srgb, ${tint} 35%, light-dark(${colors.gray[9]}, ${colors.gray[0]})), color-mix(in srgb, ${tint} 25%, light-dark(${colors.gray[9]}, ${colors.gray[0]})))`,
  borderColor: `color-mix(in srgb, ${tint} 35%, ${alpha(colors.white, 0.3)})`,
  boxShadow: `0 0.25em 0.75em color-mix(in srgb, ${tint} 18%, transparent), inset 0 1px 0 ${alpha(colors.white, 0.16)}`,
  selectors: { '&:hover:not(:disabled)': { background: `linear-gradient(145deg, color-mix(in srgb, ${tint} 35%, light-dark(${colors.gray[9]}, ${colors.gray[0]})), color-mix(in srgb, ${tint} 35%, light-dark(${colors.gray[9]}, ${colors.gray[0]})))` } },
});

export const customSecondary = style({
  color: `color-mix(in srgb, ${tint} 35%, ${vars.color.text})`,
  backgroundColor: `color-mix(in srgb, ${tint} 12%, transparent)`,
  borderColor: `color-mix(in srgb, ${tint} 40%, transparent)`,
  selectors: { '&:hover:not(:disabled)': { backgroundColor: `color-mix(in srgb, ${tint} 22%, transparent)` } },
});

export const customGhost = style({
  color: `color-mix(in srgb, ${tint} 35%, ${vars.color.text})`,
  selectors: { '&:hover:not(:disabled)': { backgroundColor: `color-mix(in srgb, ${tint} 14%, transparent)` } },
});

export const paddings = styleVariants({
  fit: {
    minHeight: '1.5em',
    lineHeight: 1,
    padding: 'calc(0.25em - 1px) 0.5em',
    verticalAlign: 'baseline',
  },
  normal: { minHeight: '2.5em', padding: '0.5em 1em' },
  custom: {},
});
