import { style } from '@vanilla-extract/css';

export const selectionLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25em',
  verticalAlign: 'middle',
  selectors: {
    '&:has(input:enabled)': { cursor: 'pointer' },
  },
});
