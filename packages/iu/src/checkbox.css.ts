import { style, styleVariants } from '@vanilla-extract/css';
import check from '@iconify-icons/material-symbols/check';
import remove from '@iconify-icons/material-symbols/remove';
import { secondaryRules } from './button.css.js';
import { vars } from './root.css.js';

function iconMask(icon: typeof check) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width ?? 24} ${icon.height ?? 24}">${icon.body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") center / contain no-repeat`;
}

export const checkbox = style({
  appearance: 'none',
  position: 'relative',
  boxSizing: 'content-box',
  inlineSize: '1em',
  blockSize: '1em',
  verticalAlign: 'middle',
  font: 'inherit',
  flexShrink: 0,
  backgroundColor: secondaryRules.backgroundColor,
  border: `1px solid color-mix(in srgb, ${vars.color.text} 55%, ${vars.color.border})`,
  borderRadius: '0.25em',
  transition: 'border-color 140ms ease-out',
  selectors: {
    '&:enabled': { cursor: 'pointer' },
    '&:enabled:hover, &:checked, &:indeterminate': { borderColor: vars.color.text },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      margin: 'auto',
      inlineSize: '75%',
      blockSize: '75%',
      backgroundColor: vars.color.text,
      mask: iconMask(check),
      opacity: 0,
      transform: 'scale(0.7)',
      transition: 'opacity 140ms ease-out, transform 140ms ease-out',
    },
    '&:checked::before, &:indeterminate::before': { opacity: 1, transform: 'scale(1)' },
    '&:indeterminate::before': { mask: iconMask(remove) },
    '&:disabled': { opacity: 0.55 },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: { '&::before': { transition: 'none' } },
    },
    '(forced-colors: active)': {
      appearance: 'auto',
      selectors: { '&::before': { display: 'none' } },
    },
  },
});

export const paddings = styleVariants({
  fit: { padding: '0.125em', verticalAlign: '-0.25em' },
  normal: { padding: '0.5em' },
  custom: {},
});
