import { fallbackVar, style, styleVariants } from '@vanilla-extract/css';
import { vars } from './root.css.js';
import { colors } from './tokens.js';

const surface = style({
  border: `1px solid light-dark(${colors.gray[3]}, ${colors.gray[8]})`,
  borderRadius: '0.625em',
  backgroundColor: `light-dark(${colors.white}, ${colors.gray[9]})`,
});

export const block = style([surface, {
  display: 'block',
  boxSizing: 'border-box',
  maxWidth: '100%',
  minWidth: 0,
  margin: 0,
  color: fallbackVar(vars.color.text, `light-dark(${colors.gray[9]}, ${colors.gray[0]})`),
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
  selectors: { '&:focus-visible': { outline: `2px solid ${fallbackVar(vars.color.focus, `light-dark(${colors.blue[7]}, ${colors.blue[3]})`)}`, outlineOffset: '2px' } },
}]);
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


export const copyRow = style([surface, {
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'start',
  gap: '0.25em',
  minWidth: 0,
}]);

export const embedded = style({
  border: 0,
  backgroundColor: 'transparent',
  minHeight: 0,
  selectors: {
    [`${copyRow} > &`]: { margin: 0, paddingRight: '0.125em' },
  },
});

export const copyButton = style({
  selectors: {
    [`${copyRow} > &`]: {
      marginBlockStart: 'calc(0.5em - 1px)',
      marginInlineEnd: '0.25em',
    },
  },
});

export const compactCopyButton = style({
  selectors: {
    [`${copyRow} > &`]: {
      minHeight: 0,
      paddingBlock: 0,
      paddingInline: '0.375em',
      marginBlockStart: '0.125em',
    },
  },
});
