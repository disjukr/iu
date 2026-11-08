import { createVar, style } from '@vanilla-extract/css';

import { colors } from './tokens.js';
import { vars } from './root.css.js';
import { alpha } from './color.js';

export const tint = createVar();

export const tooltip = style({
  position: 'fixed',
  inset: 'auto',
  top: 0,
  left: 0,
  boxSizing: 'border-box',
  width: 'max-content',
  maxWidth: 'min(24em, calc(100vw - 16px))',
  maxHeight: 'calc(100dvh - 16px)',
  margin: 0,
  padding: '0.375em 0.625em',
  border: '1px solid transparent',
  borderColor: `light-dark(${alpha(colors.white, 0.2)}, ${alpha(colors.white, 0.6)})`,
  borderRadius: '0.375em',
  backgroundColor: `light-dark(${colors.gray[9]}, ${colors.gray[0]})`,
  color: `light-dark(${colors.gray[0]}, ${colors.gray[9]})`,
  boxShadow: `0 0.25em 0.75em ${alpha(colors.blue[9], 0.14)}, inset 0 1px 0 ${alpha(colors.white, 0.16)}`,
  WebkitBackdropFilter: `blur(${vars.glass.blur})`,
  backdropFilter: `blur(${vars.glass.blur})`,
  font: 'inherit',
  lineHeight: 'inherit',
  textAlign: 'start',
  overflowWrap: 'anywhere',
  whiteSpace: 'normal',
  cursor: 'default',
  overflow: 'visible',
});

export const arrow = style({
  position: 'absolute',
  boxSizing: 'border-box',
  width: '0.5em',
  height: '0.5em',
  backgroundColor: 'inherit',
  borderColor: 'inherit',
  borderStyle: 'solid',
  borderWidth: 0,
  transform: 'rotate(45deg)',
  pointerEvents: 'none',
  selectors: {
    '&[data-side="top"]': { bottom: 'calc(-0.25em - 1px)', borderRightWidth: '1px', borderBottomWidth: '1px' },
    '&[data-side="bottom"]': { top: 'calc(-0.25em - 1px)', borderTopWidth: '1px', borderLeftWidth: '1px' },
    '&[data-side="left"]': { right: 'calc(-0.25em - 1px)', borderTopWidth: '1px', borderRightWidth: '1px' },
    '&[data-side="right"]': { left: 'calc(-0.25em - 1px)', borderBottomWidth: '1px', borderLeftWidth: '1px' },
  },
});

// Match Button's filled custom tint against a contrasting neutral surface.
export const customColor = style({
  backgroundColor: `color-mix(in srgb, ${tint} 35%, light-dark(${colors.gray[9]}, ${colors.gray[0]}))`,
  borderColor: `color-mix(in srgb, ${tint} 35%, ${alpha(colors.white, 0.3)})`,
  boxShadow: `0 0.25em 0.75em color-mix(in srgb, ${tint} 18%, transparent), inset 0 1px 0 ${alpha(colors.white, 0.16)}`,
});
