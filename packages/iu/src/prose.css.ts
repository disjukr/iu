import { globalStyle, style } from '@vanilla-extract/css';
import type { GlobalStyleRule } from '@vanilla-extract/css';
import { button, buttonRules, normalPadding, secondaryRules } from './button.css.js';
import { unroot, vars } from './root.css.js';
import { colors } from './tokens.js';
import { headingMargins, headingPresets, paragraphMargins, textPresets, typographyElement } from './typography.css.js';

export const prose = style({});
const scope = `(.${prose}) to (.${unroot})`;

function scoped(selector: string, rules: GlobalStyleRule) {
  globalStyle(`:scope ${selector}`, { '@scope': { [scope]: rules } });
}

const headings = { h1: 'xl', h2: 'lg', h3: 'md', h4: 'sm', h5: 'xs', h6: 'xs' } as const;
for (const [tag, size] of Object.entries(headings)) {
  scoped(`:where(${tag}:not(.${typographyElement}))`, { ...headingPresets[size], ...headingMargins });
}

scoped(`:where(p:not(.${typographyElement}))`, { ...textPresets.md, ...paragraphMargins });
scoped(':where(a[href])', {
  color: `light-dark(${colors.blue[8]}, ${colors.blue[3]})`,
  textDecoration: 'underline',
  textUnderlineOffset: '0.15em',
});

const nativeButton = `:where(button:not(.${button}))`;
const { selectors: buttonStates, ...buttonBase } = buttonRules;
const { selectors: secondaryStates, ...secondaryBase } = secondaryRules;
scoped(nativeButton, { ...buttonBase, ...secondaryBase, ...normalPadding });
for (const [selector, rules] of Object.entries({ ...buttonStates, ...secondaryStates })) {
  scoped(selector.replace('&', nativeButton), rules);
}

scoped(`:where(a[href], button:not(.${button})):focus-visible`, {
  outline: `2px solid ${vars.color.focus}`,
  outlineOffset: '2px',
});
