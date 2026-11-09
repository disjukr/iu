import { fallbackVar, style } from '@vanilla-extract/css';
import { alpha } from './color.js';
import { vars } from './root.css.js';
import { codeFontFamily, colors } from './tokens.js';

export const code = style({
  font: 'inherit',
  fontFamily: codeFontFamily,
  color: fallbackVar(vars.color.text, `light-dark(${colors.gray[9]}, ${colors.gray[0]})`),
  backgroundColor: `light-dark(${alpha(colors.gray[9], 0.09)}, ${alpha(colors.black, 0.28)})`,
  borderRadius: '0.25em',
  paddingInline: '0.3em',
  overflowWrap: 'anywhere',
});
