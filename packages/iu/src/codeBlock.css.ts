import { fallbackVar, style, styleVariants } from '@vanilla-extract/css';
import { vars } from './root.css.js';

export const block = style({
  display: 'block',
  boxSizing: 'border-box',
  maxWidth: '100%',
  minWidth: 0,
  margin: 0,
  border: '1px solid light-dark(#d0d7de, #30363d)',
  borderRadius: '0.625em',
  backgroundColor: 'light-dark(#ffffff, #0d1117)',
  color: 'light-dark(#24292e, #e1e4e8)',
  fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontStyle: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  textAlign: 'start',
  textTransform: 'none',
  whiteSpace: 'pre',
  overflowWrap: 'normal',
  wordBreak: 'normal',
  tabSize: 2,
  overflowX: 'auto',
  direction: 'ltr',
  selectors: { '&:focus-visible': { outline: `2px solid ${fallbackVar(vars.color.focus, 'light-dark(#1971c2, #74c0fc)')}`, outlineOffset: '2px' } },
});
export const code = style({
  display: 'block',
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
  font: 'inherit',
  color: 'inherit',
  whiteSpace: 'inherit',
  textAlign: 'inherit',
  direction: 'ltr',
});
export const themes = styleVariants({
  auto: {},
  light: { colorScheme: 'light' },
  dark: { colorScheme: 'dark' },
});

export const paddings = styleVariants({
  fit: {
    minHeight: '1.5em',
    lineHeight: 1,
    padding: 'calc(0.25em - 1px) 0.5em',
  },
  normal: {
    minHeight: '2.5em',
    // Preserve inherited line spacing while matching a normal Button.
    padding: 'max(0px, calc((2.5em - 1lh) / 2 - 1px)) 1em',
  },
  custom: {},
});
