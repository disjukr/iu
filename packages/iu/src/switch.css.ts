import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { vars } from './root.css.js';

const thumb = createVar();

export const switchInput = style({
  appearance: 'none',
  position: 'relative',
  boxSizing: 'content-box',
  inlineSize: '2.25em',
  blockSize: '1em',
  flexShrink: 0,
  font: 'inherit',
  verticalAlign: 'middle',
  border: `1px solid color-mix(in srgb, ${vars.color.text} 55%, ${vars.color.border})`,
  borderRadius: '999px',
  backgroundColor: vars.color.surface,
  transition: 'background-color 160ms ease, border-color 160ms ease',
  vars: { [thumb]: vars.color.text },
  selectors: {
    '&:enabled': { cursor: 'pointer' },
    '&:enabled:hover': { borderColor: vars.color.text },
    '&:checked': {
      borderColor: vars.color.text,
      backgroundColor: vars.color.text,
      vars: { [thumb]: vars.color.surface },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      insetBlock: '0.125em',
      insetInlineStart: '0.125em',
      aspectRatio: '1',
      borderRadius: '50%',
      backgroundColor: thumb,
      transition: 'inset-inline-start 160ms ease, transform 160ms ease, background-color 160ms ease',
    },
    '&:checked::before': {
      insetInlineStart: 'calc(100% - 0.125em)',
      transform: 'translateX(-100%)',
    },
    '&:dir(rtl):checked::before': { transform: 'translateX(100%)' },
    '&:disabled': { opacity: 0.55 },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: { '&::before': { transition: 'none' } },
    },
    '(forced-colors: active)': {
      appearance: 'auto',
      inlineSize: '1.125em',
      blockSize: '1.125em',
      selectors: { '&::before': { display: 'none' } },
      border: 0,
    },
  },
});

export const paddings = styleVariants({
  fit: { padding: 0, inlineSize: '1.875em' },
  normal: { padding: '0.25em' },
  custom: {},
});
