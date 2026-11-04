import { createTheme, style } from '@vanilla-extract/css';
import { colors, typography } from './tokens.js';

export const [theme, vars] = createTheme({
  color: { text: colors.gray[9], surface: colors.white, border: colors.gray[4], focus: colors.blue[7] },
  font: typography,
});

/** Apply explicitly to each owned element; this never resets descendants. */
export const element = style({
  boxSizing: 'border-box', margin: 0, padding: 0,
  border: '0 solid transparent', minWidth: 0,
  fontFamily: vars.font.fontFamily, fontSize: vars.font.fontSize,
  fontWeight: vars.font.fontWeight, lineHeight: vars.font.lineHeight,
  fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal',
  fontOpticalSizing: 'auto', fontFeatureSettings: 'normal', fontVariationSettings: 'normal',
  letterSpacing: 'normal', textAlign: 'start', textIndent: 0,
  textTransform: 'none', textDecoration: 'none', whiteSpace: 'normal',
  color: vars.color.text, backgroundColor: 'transparent',
});
/** Opt-in boundary. Themes can also be applied separately to a subtree/portal. */
export const foundation = style([theme, element, { display: 'block', backgroundColor: vars.color.surface }]);
/** Add to interactive elements, in addition to their eventual component styles. */
export const focusRing = style({
  selectors: { '&:focus-visible': { outline: `2px solid ${vars.color.focus}`, outlineOffset: '2px' } },
});
