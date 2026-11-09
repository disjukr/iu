import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { secondaryRules } from './button.css.js';
import { vars } from './root.css.js';

const ring = createVar();
const surface = createVar();

export const radio = style({
  appearance: 'none',
  boxSizing: 'content-box',
  inlineSize: '1em',
  blockSize: '1em',
  verticalAlign: 'middle',
  font: 'inherit',
  // The transparent border separates the indicator from the hit area and focus outline.
  border: '0.125em solid transparent',
  borderRadius: '0.375em',
  vars: {
    [ring]: `color-mix(in srgb, ${vars.color.text} 55%, ${vars.color.border})`,
    [surface]: vars.color.surface,
  },
  backgroundImage: `radial-gradient(circle closest-side, ${vars.color.text} 0 40%, transparent 44%),
    radial-gradient(circle closest-side, ${surface} 0 calc(100% - 1.5px), ${ring} calc(100% - 1.5px) calc(100% - 0.5px), transparent 100%)`,
  backgroundOrigin: 'padding-box',
  backgroundPosition: 'center',
  backgroundSize: '0 0, 100% 100%',
  transition: 'background-size 140ms ease-out',
  backgroundRepeat: 'no-repeat',
  selectors: {
    '&:enabled': { cursor: 'pointer' },
    '&:enabled:hover': { vars: { [ring]: vars.color.text } },
    '&:checked': { backgroundSize: '100% 100%, 100% 100%', vars: { [ring]: vars.color.text } },
    '&:disabled': { opacity: 0.55 },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
    '(forced-colors: active)': {
      appearance: 'auto',
      backgroundImage: 'none',
      border: 'none',
    },
  },
});

export const paddings = styleVariants({
  fit: { padding: '0.125em', verticalAlign: '-0.375em' },
  normal: {
    padding: '0.5em',
    borderWidth: '0.25em',
    borderRadius: '0.5em',
    vars: { [surface]: secondaryRules.backgroundColor },
  },
  custom: {},
});
