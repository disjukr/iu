import { lazy } from 'solid-js';
import type { JSX } from 'iu';
const Introduction = lazy(() => import('./pages/Introduction'), { export: 'Introduction' });
const GettingStarted = lazy(() => import('./pages/GettingStarted'), { export: 'GettingStarted' });
const Colors = lazy(() => import('./pages/Colors'), { export: 'Colors' });
const Typography = lazy(() => import('./pages/Typography'), { export: 'Typography' });
const Api = lazy(() => import('./pages/Api'), { export: 'Api' });
const ButtonPage = lazy(() => import('./pages/ButtonPage'), { export: 'ButtonPage' });
const ButtonGroupPage = lazy(() => import('./pages/ButtonGroupPage'), { export: 'ButtonGroupPage' });

const CodeBlockPage = lazy(() => import('./pages/CodeBlockPage'), { export: 'CodeBlockPage' });

const TooltipPage = lazy(() => import('./pages/TooltipPage'), { export: 'TooltipPage' });

const CopyButtonPage = lazy(() => import('./pages/CopyButtonPage'), { export: 'CopyButtonPage' });

export type DocPage = {
  path: string;
  title: string;
  description: string;
  group: string;
  kind: 'guide' | 'component';
  keywords?: string;
  render: () => JSX.Element;
};

// Register shipped documentation here; planned components stay in the repository TODO.
// Add semantic groups as the catalog grows, keeping component titles alphabetical.
export const pages: DocPage[] = [
  { path: '/introduction', title: 'Overview', description: 'Meet iu and start building.', group: 'Start', kind: 'guide', render: Introduction },
  { path: '/getting-started', title: 'Getting started', description: 'Install iu and apply its styles.', group: 'Start', kind: 'guide', render: GettingStarted },
  { path: '/colors', title: 'Colors', description: 'Open Color palette and shades.', group: 'Foundations', kind: 'guide', render: Colors },
  { path: '/typography', title: 'Typography', description: 'Fonts, sizes, and line height.', group: 'Foundations', kind: 'guide', render: Typography },
  { path: '/api', title: 'API reference', description: 'Shared exports, tokens, and styling utilities.', group: 'Foundations', kind: 'guide', render: Api },
  { path: '/components/tooltip', title: 'Tooltip', description: 'Supplementary descriptions on hover and keyboard focus.', group: 'Overlays', kind: 'component', keywords: 'help hint description 툴팁', render: TooltipPage },
  { path: '/components/code-block', title: 'CodeBlock', description: 'Display source code with syntax highlighting.', group: 'Content', kind: 'component', keywords: 'shiki syntax code snippet shell', render: CodeBlockPage },
  { path: '/components/copy-button', title: 'CopyButton', description: 'Copy text with progress, success, and error feedback.', group: 'Actions', kind: 'component', keywords: 'clipboard copy 복사', render: CopyButtonPage },
  { path: '/components/button', title: 'Button', description: 'Trigger an action with a native button.', group: 'Actions', kind: 'component', keywords: 'click submit action 버튼', render: ButtonPage },
  { path: '/components/button-group', title: 'ButtonGroup', description: 'Join related actions horizontally or vertically.', group: 'Actions', kind: 'component', keywords: 'group horizontal vertical 버튼 그룹', render: ButtonGroupPage },
];

export const components = pages.filter(page => page.kind === 'component').sort((a, b) => a.title.localeCompare(b.title));
export function matchesSearch(page: Pick<DocPage, 'title' | 'description' | 'group' | 'keywords'>, query: string) {
  const text = `${page.title} ${page.description} ${page.group} ${page.keywords ?? ''}`.toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(term => text.includes(term));
}
