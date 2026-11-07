import { assignVars, createThemeContract, globalStyle, style } from '@vanilla-extract/css';
import { colors, typography } from './tokens.js';
import { alpha } from './color.js';

const defaults = {
  color: {
    text: `light-dark(${colors.gray[9]}, ${colors.gray[0]})`,
    surface: `light-dark(${alpha(colors.gray[0], 0.64)}, ${alpha(colors.gray[9], 0.78)})`,
    border: `light-dark(${alpha(colors.white, 0.8)}, ${alpha(colors.blue[2], 0.18)})`,
    focus: `light-dark(${colors.blue[7]}, ${colors.blue[3]})`,
  },
  glass: { blur: '20px', radius: '0.75em', shadow: `0 16px 48px light-dark(${alpha(colors.blue[9], 0.08)}, ${alpha(colors.black, 0.24)}), inset 0 1px 0 light-dark(${alpha(colors.white, 0.6)}, ${alpha(colors.white, 0.08)})` },
  font: typography,
};
export const vars = createThemeContract(defaults);

/** Default tokens and inherited typography for an iu subtree. */
export const root = style({
  vars: assignVars(vars, defaults),
  colorScheme: 'light',
  selectors: { '&[data-theme="dark"]': { colorScheme: 'dark' } },
  fontFamily: vars.font.fontFamily,
  fontSize: vars.font.fontSize,
  fontWeight: vars.font.fontWeight,
  lineHeight: vars.font.lineHeight,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontStretch: 'normal',
  fontOpticalSizing: 'auto',
  fontFeatureSettings: 'normal',
  fontVariationSettings: 'normal',
  letterSpacing: 'normal',
  textAlign: 'start',
  textIndent: 0,
  textTransform: 'none',
  whiteSpace: 'normal',
  color: vars.color.text,
});

/** Stop the subtree reset and clear inherited iu tokens and typography. */
export const unroot = style({
  colorScheme: 'normal',
  vars: assignVars(vars, {
    color: { text: 'initial', surface: 'initial', border: 'initial', focus: 'initial' },
    glass: { blur: 'initial', radius: 'initial', shadow: 'initial' },
    font: { fontFamily: 'initial', fontSize: 'initial', fontWeight: 'initial', lineHeight: 'initial' },
  }),
  font: 'initial',
  fontOpticalSizing: 'auto',
  fontFeatureSettings: 'normal',
  fontVariationSettings: 'normal',
  letterSpacing: 'normal',
  textAlign: 'initial',
  textIndent: 0,
  textTransform: 'none',
  whiteSpace: 'normal',
  color: 'initial',
});

const scope = `(.${root}) to (.${unroot})`;

// Zero specificity lets component and application styles override the reset.
globalStyle(':where(:scope, :scope *)', {
  '@scope': {
    [scope]: {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      border: '0 solid transparent',
      minWidth: 0,
    },
  },
});
globalStyle(':where(:scope, :scope *)::before, :where(:scope, :scope *)::after', {
  '@scope': { [scope]: { boxSizing: 'border-box' } },
});
globalStyle(':where(button, input, select, textarea, h1, h2, h3, h4, h5, h6)', {
  '@scope': { [scope]: { font: 'inherit', color: 'inherit', letterSpacing: 'inherit' } },
});

/** Opt-in keyboard focus outline. */
export const focusRing = style({
  selectors: { '&:focus-visible': { outline: `2px solid ${vars.color.focus}`, outlineOffset: '2px' } },
});

/** Translucent surface; apply within a root. */
export const glass = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.glass.radius,
  boxShadow: vars.glass.shadow,
  WebkitBackdropFilter: `blur(${vars.glass.blur}) saturate(120%)`,
  backdropFilter: `blur(${vars.glass.blur}) saturate(120%)`,
});
