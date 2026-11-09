import { style } from '@vanilla-extract/css';
import { vars } from './root.css.js';
import { colors } from './tokens.js';

export const card = style({
  display: 'block',
  minInlineSize: 0,
  boxSizing: 'border-box',
  padding: '1em',
  font: 'inherit',
  textAlign: 'start',
  color: vars.color.text,
  textDecoration: 'none',
  overflowWrap: 'anywhere',
});

export const paper = style({
  backgroundColor: `light-dark(${colors.gray[0]}, ${colors.gray[9]})`,
  border: `1px solid color-mix(in srgb, ${vars.color.border}, ${vars.color.text} 12%)`,
  borderRadius: vars.glass.radius,
  boxShadow: vars.glass.shadow,
});

export const interactive = style({
  selectors: {
    '&:is(button:not(:disabled), a[href], label:has(input:enabled))': {
      cursor: 'pointer',
    },
    '&:is(button:not(:disabled), a[href], label:has(input:enabled)):hover': {
      borderColor: vars.color.focus,
    },
    '&:has(input:checked), &[aria-pressed="true"]': {
      borderColor: vars.color.focus,
    },
    '&:is(:disabled, label:has(input:disabled))': {
      opacity: 0.6,
    },
  },
});
