import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import shell from 'shiki/langs/shellscript.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import json from 'shiki/langs/json.mjs';
import css from 'shiki/langs/css.mjs';
import html from 'shiki/langs/html.mjs';
import githubLight from 'shiki/themes/github-light.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';
import * as styles from './codeBlock.css.js';

export type CodeBlockLanguage = 'text' | 'tsx' | 'shellscript' | 'javascript' | 'typescript' | 'json' | 'css' | 'html';
export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children' | 'class'> & {
  code: string;
  language?: CodeBlockLanguage;
  theme?: 'auto' | 'light' | 'dark';
  padding?: 'fit' | 'normal' | 'custom';
  class?: JSX.ClassValue;
};

// Initialize only when a CodeBlock is rendered, keeping other iu consumers free
// of highlighter setup work. Bundlers can remove this module when it is unused.
let highlighter: ReturnType<typeof createHighlighterCoreSync> | undefined;
function getHighlighter() {
  return highlighter ??= createHighlighterCoreSync({
    themes: [githubLight, githubDark],
    langs: [tsx, shell, javascript, typescript, json, css, html],
    engine: createJavaScriptRegexEngine(),
  });
}

export function CodeBlock(props: CodeBlockProps) {
  const rest = omit(props, 'code', 'language', 'theme', 'padding', 'class', 'tabindex', 'aria-label');
  const highlighted = () => getHighlighter().codeToTokens(props.code, {
    lang: props.language ?? 'tsx',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: 'light-dark()',
  });
  return <pre
    {...rest}
    class={[styles.block, styles.paddings[props.padding ?? 'normal'], styles.themes[props.theme ?? 'auto'], 'shiki', props.class]}
    tabindex={props.tabindex ?? 0}
    aria-label={props['aria-label'] ?? `${props.language ?? 'tsx'} code example`}
  ><code class={styles.code}>{highlighted().tokens.map((line, index) => <>
    {index > 0 && '\n'}<span class="line">{line.map(token => <span style={{
      ...token.htmlStyle,
      color: token.color ?? 'light-dark(var(--shiki-light), var(--shiki-dark))',
      'font-style': token.fontStyle && token.fontStyle & 1 ? 'italic' : undefined,
      'font-weight': token.fontStyle && token.fontStyle & 2 ? 'bold' : undefined,
      'text-decoration': token.fontStyle && token.fontStyle & 4 ? 'underline' : undefined,
    }}>{token.content}</span>)}</span>
  </>)}</code></pre>;
}
