import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { button } from './button.css.js';

export const group = style({
  display: 'inline-flex',
  alignItems: 'stretch',
  gap: 0,
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: 'middle',
  isolation: 'isolate',
});

export const orientations = styleVariants({
  horizontal: { flexDirection: 'row' },
  vertical: { flexDirection: 'column' },
});

// Only direct iu buttons participate; nested groups keep their own boundaries.
globalStyle(`${group} > ${button}`, { position: 'relative', flex: '0 1 auto' });
globalStyle(`${group} > ${button}:focus-visible`, { zIndex: 1 });

for (const [orientation, start, end, margin] of [
  ['horizontal', ['borderStartStartRadius', 'borderEndStartRadius'], ['borderStartEndRadius', 'borderEndEndRadius'], 'marginInlineStart'],
  ['vertical', ['borderStartStartRadius', 'borderStartEndRadius'], ['borderEndStartRadius', 'borderEndEndRadius'], 'marginBlockStart'],
] as const) {
  const selector = `${orientations[orientation]} > ${button}`;
  globalStyle(`${selector}:not(:first-child)`, { [start[0]]: 0, [start[1]]: 0 });
  globalStyle(`${selector}:not(:last-child)`, { [end[0]]: 0, [end[1]]: 0 });
  globalStyle(`${selector} + ${button}`, { [margin]: '-1px' });
}
