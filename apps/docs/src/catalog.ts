import { lazy } from 'solid-js';
import type { JSX } from 'iu';
const Introduction = lazy(() => import('./pages/Introduction'), { export: 'Introduction' });
const GettingStarted = lazy(() => import('./pages/GettingStarted'), { export: 'GettingStarted' });
const Colors = lazy(() => import('./pages/Colors'), { export: 'Colors' });
const Typography = lazy(() => import('./pages/Typography'), { export: 'Typography' });
const TypographyComponentPage = lazy(() => import('./pages/TypographyComponents'), { export: 'TypographyComponentPage' });
const Api = lazy(() => import('./pages/Api'), { export: 'Api' });
const ButtonPage = lazy(() => import('./pages/ButtonPage'), { export: 'ButtonPage' });
const ButtonGroupPage = lazy(() => import('./pages/ButtonGroupPage'), { export: 'ButtonGroupPage' });

const SwitchPage = lazy(() => import('./pages/SwitchPage'), { export: 'SwitchPage' });
const CheckboxPage = lazy(() => import('./pages/CheckboxPage'), { export: 'CheckboxPage' });
const RadioPage = lazy(() => import('./pages/RadioPage'), { export: 'RadioPage' });
const InputPage = lazy(() => import('./pages/InputPage'), { export: 'InputPage' });
const CardPage = lazy(() => import('./pages/CardPage'), { export: 'CardPage' });
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
  { path: '/components/code', title: 'Code', description: 'Mark up inline commands and identifiers.', group: 'Typography', kind: 'component', render: () => TypographyComponentPage({ name: 'Code' }) },
  { path: '/components/heading', title: 'Heading', description: 'Style semantic section headings.', group: 'Typography', kind: 'component', render: () => TypographyComponentPage({ name: 'Heading' }) },
  { path: '/components/paragraph', title: 'Paragraph', description: 'Set body text with paragraph spacing.', group: 'Typography', kind: 'component', render: () => TypographyComponentPage({ name: 'Paragraph' }) },
  { path: '/components/prose', title: 'Prose', description: 'Style native HTML within a scoped container.', group: 'Typography', kind: 'component', render: () => TypographyComponentPage({ name: 'Prose' }) },
  { path: '/components/text', title: 'Text', description: 'Apply shared styles to inline text.', group: 'Typography', kind: 'component', render: () => TypographyComponentPage({ name: 'Text' }) },
  { path: '/components/tooltip', title: 'Tooltip', description: 'Supplementary descriptions on hover and keyboard focus.', group: 'Overlays', kind: 'component', keywords: 'help hint description 툴팁', render: TooltipPage },
  { path: '/components/switch', title: 'Switch', description: 'Toggle a setting that takes effect immediately.', group: 'Inputs', kind: 'component', keywords: 'switch toggle on off', render: SwitchPage },
  { path: '/components/checkbox', title: 'Checkbox', description: 'Toggle independent options and show mixed selection.', group: 'Inputs', kind: 'component', keywords: 'checkbox mixed indeterminate selection', render: CheckboxPage },
  { path: '/components/input', title: 'Input', description: 'Enter text in a native form field.', group: 'Inputs', kind: 'component', keywords: 'textfield email search password 입력', render: InputPage },
  { path: '/components/radio', title: 'Radio', description: 'Choose one option in a RadioGroup.', group: 'Inputs', kind: 'component', keywords: 'radio group selection padding', render: RadioPage },
  { path: '/components/card', title: 'Card', description: 'Group content, actions, or selection controls on a surface.', group: 'Content', kind: 'component', keywords: 'paper glass surface selection 카드', render: CardPage },
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
