# Component TODO

Candidate inventory researched on 2026-11-04 and updated from Astryx on
2026-11-08 for `packages/iu`, with examples and documentation intended for
`apps/docs`. This is a planning checklist, not a
commitment to ship every item or an implementation order. Checked entries
reflect existing implementations; partially implemented scopes remain unchecked (for example, CodeBlock exists but inline Code is pending).

Names are provisional PascalCase APIs, sorted globally A–Z without category
breaks. Each line links to official reference inventories. Descriptions state
the proposed iu scope, not a claim that every reference has identical behavior.
Equivalent names and simple variants are folded into one entry. Distinct
interaction patterns remain separate: Select/Combobox/Listbox,
Dialog/AlertDialog, and Table/DataTable/DataGrid are not interchangeable.

Prioritize rieul.app's settings, navigation, overlays, commands and collections
when choosing the first implementation batch. Charts, image editing, signatures
and tours should wait for concrete application needs. Reusable chat/AI presentation
and interaction patterns are included; product-specific agent orchestration,
model/network integration, editor engines, marketing animation and backend upload
logic remain outside this inventory. Rich text is an optional integration surface,
not a new editor engine; range selection is scoped within the matching date/time entry.
Layout and accessibility utilities are included where
they help compose components; low-level subparts are not separate tasks.

Keep Solid 2, TypeScript, ESM-only packaging and vanilla-extract. Reuse Open
Color and application-provided fonts. Specify owned-element styles explicitly
without imposing a global reset. For each future component, include keyboard
and screen-reader behavior, focus management, controlled/uncontrolled state
where relevant, RTL, disabled/error states, reset-CSS resistance, and consumer
build tests. Check Solid 2 compatibility before adopting any dependency: these
libraries are design references, not verified compatible dependencies.

## Checklist

- [ ] **Accordion** — Expandable sections; includes DisclosureGroup. [R][R], [K][K], [A][A].
- [ ] **Alert** — Inline status or warning; includes Banner. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **AlertDialog** — Confirmation requiring an explicit decision. [R][R], [K][K], [S][S].
- [ ] **AppShell** — Application header, navigation and content layout. [M][M], [AX][AX].
- [ ] **AspectRatio** — Content constrained to a ratio. [R][R], [M][M], [S][S], [AX][AX].
- [ ] **Avatar** — User image with initials fallback; includes grouped avatars and overflow count. [R][R], [A][A], [M][M], [AX][AX].
- [ ] **Badge** — Compact status or count. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **BottomNavigation** — Compact navigation among top-level destinations on small screens. [MU][MU].
- [ ] **Breadcrumbs** — Hierarchical navigation trail. [K][K], [M][M], [S][S], [AX][AX].
- [x] **Button** — Actions, including icon-only, close and loading variants. [K][K], [M][M], [S][S], [AX][AX].
- [x] **ButtonGroup** — Related actions sharing a visual boundary. [S][S], [AX][AX].
- [ ] **Calendar** — Date selection surface; includes range selection. [RA][RA], [S][S], [AX][AX].
- [x] **Card** — Grouped content surface; includes Paper and clickable/selectable variants with native action/selection semantics. [M][M], [S][S], [AX][AX].
- [ ] **Carousel** — Navigable sequence of slides. [A][A], [S][S], [AX][AX].
- [ ] **Cascader** — Selection through dependent hierarchical options. [M][M].
- [ ] **Chart** — Optional visualization adapters; assess bundle cost first. [S][S].
- [ ] **ChatComposer** — Message draft input with IME-safe submit/newline behavior, send/stop states, attachments and optional mention/command suggestions; compose Textarea, FileUpload and Mentions; transport and model selection remain app-owned. [AX][AX], [AXC][AXC].
- [ ] **ChatLayout** — Conversation viewport and composer dock with transcript semantics, history loading, new-message affordance and streaming scroll-follow that preserves manual reading position; virtualization remains a separate integration. [AX][AX], [AXC][AXC].
- [ ] **ChatMessage** — Participant message presentation with body slots, author/avatar, timestamp and delivery metadata, attachments and copy/retry/feedback actions; reuse Markdown, Citation and existing controls; includes ChatMessageMetadata. [AX][AX], [AXC][AXC].
- [ ] **ChatSystemMessage** — In-transcript event/status notices and date/unread separators with wrapping and appropriate announcement behavior; distinct from participant messages and transient Toast. [AX][AX], [AXC][AXC].
- [ ] **ChatToolCalls** — Expandable individual/grouped AI tool-call presentation with pending/running/success/error/cancelled states, input/output slots and optional approval/retry/cancel controls; execution, authorization and sensitive-data filtering remain app-owned. [AX][AX], [AXC][AXC].
- [x] **Checkbox** — Boolean and indeterminate input, including groups. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **Citation** — Source-reference link/marker with an optional accessible detail preview; compose Link and Popover rather than a chat-only block. [AX][AX].
- [x] **Clipboard** — Copy action and success/failure feedback; includes CopyButton. [A][A], [M][M].
- [x] **Code** — Inline Code and syntax-highlighted CodeBlock. [M][M], [S][S], [AX][AX].
- [ ] **Collapsible** — Single disclosure; includes Collapse and Disclosure. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **ColorArea** — Two-dimensional color adjustment. [K][K], [RA][RA].
- [ ] **ColorField** — Editable color value and channel fields. [K][K], [RA][RA].
- [ ] **ColorPicker** — Composed color selection, including swatch selection. [A][A], [M][M], [RA][RA].
- [ ] **ColorSlider** — Color channel adjustment, including hue and alpha. [K][K], [M][M], [RA][RA].
- [ ] **ColorSwatch** — Color sample with accessible labeling. [K][K], [M][M], [RA][RA].
- [ ] **ColorWheel** — Hue selection on a wheel. [K][K], [RA][RA].
- [ ] **Combobox** — Editable suggestions; includes Autocomplete, Typeahead and multi-selection. [K][K], [A][A], [RA][RA], [AX][AX].
- [ ] **CommandPalette** — Searchable commands and keyboard actions. [S][S], [AX][AX].
- [ ] **ContextMenu** — Pointer- or keyboard-invoked contextual actions. [R][R], [K][K], [S][S].
- [ ] **DataGrid** — Cell navigation/editing, column resizing and virtualized data; beyond a sortable DataTable. [MXG][MXG].
- [ ] **DataList** — Label/value details; includes MetadataList. [M][M], [AX][AX].
- [ ] **DataTable** — Sorting, filtering and selection built on Table; includes a contextual selection toolbar. [S][S], [AX][AX].
- [ ] **DateField** — Segmented date input and paired range fields; includes DateInput. [A][A], [RA][RA], [MXP][MXP], [AX][AX].
- [ ] **DatePicker** — Date/calendar selection including ranges and month/year granularity. [RA][RA], [MXP][MXP], [AD][AD].
- [ ] **DateTimePicker** — Combined date/time input and overlay, including ranges and timezone policy. [MXP][MXP], [AX][AX].
- [ ] **Dialog** — Modal/non-modal dialog; includes Modal. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Drawer** — Edge-attached panel; includes Sheet and bottom sheet. [A][A], [M][M], [S][S], [AX][AX].
- [ ] **Editable** — Inline text editing with commit/cancel. [A][A].
- [ ] **EmptyState** — Empty results and recovery action; includes Empty. [M][M], [S][S], [AX][AX].
- [ ] **Field** — Label, description and validation message composition. [A][A], [S][S], [AX][AX].
- [ ] **Fieldset** — Semantically grouped related fields. [A][A], [M][M].
- [ ] **FileUpload** — Picker/drop zone with file list, validation and progress/cancel UI; transport remains app-owned. [A][A], [RA][RA], [ADU][ADU], [AX][AX].
- [ ] **FloatingPanel** — Movable/resizable desktop panel; includes FloatingWindow. [A][A], [M][M].
- [ ] **FocusTrap** — Focus containment and restoration utility. [A][A], [M][M].
- [ ] **Form** — Native submission and validation coordination. [R][R], [RA][RA].
- [ ] **Grid** — Responsive columns, including SimpleGrid. [M][M], [AX][AX].
- [ ] **GridList** — Interactive item collection with grid keyboard navigation. [RA][RA].
- [ ] **HoverCard** — Supplementary preview; includes PreviewTrigger. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **Image** — Inline image with alt text, loading and failure presentation; includes Thumbnail; previews use ImageViewer. [K][K], [ADI][ADI], [AX][AX].
- [ ] **ImageCropper** — Image crop selection; evaluate only when needed. [A][A].
- [ ] **ImageViewer** — Modal image/gallery preview with zoom, pan and navigation; includes Lightbox. [ADI][ADI], [AX][AX].
- [ ] **Indicator** — Small status marker, standalone or attached to another element; includes StatusDot. [M][M], [AX][AX].
- [ ] **InputGroup** — Leading/trailing text, icons or actions around inputs. [S][S].
- [ ] **KeyboardKey** — Shortcut key presentation; includes Kbd. [M][M], [S][S], [AX][AX].
- [ ] **Link** — Accessible navigation; includes Anchor and NavLink. [K][K], [M][M], [RA][RA], [AX][AX].
- [ ] **List** — Static ordered/unordered content. [M][M], [AX][AX].
- [ ] **Listbox** — Visible selectable options, including multiple selection. [A][A], [RA][RA].
- [ ] **LoadingOverlay** — Loading state over an existing region. [M][M].
- [ ] **Markdown** — Optional read-only Markdown renderer with component overrides; define safe URL/HTML handling, parser compatibility and bundle limits separately from RichTextEditor. [AXB][AXB].
- [ ] **MaskedField** — Formatted text entry; includes MaskInput. [M][M].
- [ ] **Masonry** — Variable-height items arranged in columns; distinct from aligned Grid. [MU][MU], [AD][AD].
- [ ] **Mentions** — Text entry with triggered entity suggestions and insertion. [AD][AD].
- [ ] **MenuButton** — Triggered action menu; includes DropdownMenu, Menu and MoreMenu. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Menubar** — Persistent application menu bar. [R][R], [K][K], [M][M].
- [ ] **Meter** — Bounded measurement, distinct from task progress. [K][K], [RA][RA].
- [ ] **NavigationMenu** — Site/section navigation with expandable groups; includes TopNav and mega menus. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **NumberField** — Numeric entry with optional stepping; includes NumberInput. [K][K], [A][A], [RA][RA], [AX][AX].
- [ ] **OverflowList** — Collapse excess items into an overflow affordance. [M][M], [AX][AX].
- [ ] **Pagination** — Navigation through result pages. [K][K], [A][A], [M][M], [AX][AX].
- [ ] **PasswordField** — Password entry with visibility toggle. [R][R], [A][A], [M][M].
- [ ] **PinInput** — Segmented PIN/OTP entry; includes InputOTP. [R][R], [A][A], [M][M].
- [ ] **Popover** — Anchored interactive overlay; includes focusable InfoTip help, distinct from a non-interactive Tooltip. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Portal** — Render outside the current DOM subtree; preserve theme context. [R][R], [M][M].
- [ ] **PowerSearch** — Structured filter builder with field/operator/value tokens, suggestions and editing; app owns query execution; distinct from SearchField and CommandPalette. [AXC][AXC].
- [ ] **Progress** — Determinate/indeterminate progress, linear and circular. [R][R], [A][A], [M][M], [AX][AX].
- [ ] **QRCode** — Pairing/share code display; optional encoding dependency. [A][A].
- [x] **RadioGroup** — Native single choice from a visible set, with Radio and optional labels. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Rating** — Rating input/display; includes RatingGroup. [K][K], [A][A], [M][M].
- [ ] **Result** — Page-level success/error outcome with recovery actions, distinct from empty data. [AD][AD].
- [ ] **RichTextEditor** — Optional editor adapter and formatting toolbar; assess Solid 2, IME, document safety and bundle cost. [MRT][MRT], [AXR][AXR].
- [ ] **ScrollArea** — Scrollable region and scrollbar presentation. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **SearchField** — Search input with clear and submission behavior. [K][K], [RA][RA].
- [ ] **SegmentedControl** — Compact single-choice control; includes SegmentGroup. [K][K], [A][A], [M][M], [AX][AX].
- [ ] **Select** — Non-editable option picker with single/multiple selection; includes Selector and MultiSelector; retain a native-select variant. [R][R], [K][K], [M][M], [AX][AX].
- [ ] **Separator** — Visual/semantic division; includes Divider. [R][R], [K][K], [M][M], [AX][AX].
- [ ] **Sidebar** — Collapsible application navigation panel; includes SideNav. [S][S], [AX][AX].
- [ ] **SignaturePad** — Pointer signature capture; optional specialist component. [A][A].
- [ ] **Skeleton** — Content-shaped loading placeholders. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **Slider** — Scalar/range adjustment; include angle variant if needed. [R][R], [A][A], [M][M], [AX][AX].
- [ ] **SpeedDial** — Expandable group of floating actions; simple floating buttons remain Button variants. [MU][MU].
- [ ] **Spinner** — Indeterminate activity indicator; includes Loader. [M][M], [S][S], [AX][AX].
- [ ] **Splitter** — Resizable panels; includes Resizable and ResizeHandle. [A][A], [M][M], [S][S], [AX][AX].
- [ ] **Stack** — Row/column layout with spacing; includes Flex and Group. [M][M], [AX][AX].
- [ ] **Statistic** — Labeled metric with units and optional trend; includes countdown presentation. [AD][AD].
- [ ] **Stepper** — Multi-step workflow status/navigation; includes Steps. [A][A], [M][M], [AX][AX].
- [x] **Switch** — Immediate on/off setting. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Table** — Semantic tabular display, foundation for DataTable. [M][M], [RA][RA], [S][S], [AX][AX].
- [ ] **TableOfContents** — Navigation derived from document headings; includes Outline. [A][A], [M][M], [AX][AX].
- [ ] **Tabs** — Switch between associated content panels. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Tag** — Removable/selectable tokens; includes Chip, Pill, Token and TagGroup. [M][M], [RA][RA], [AX][AX].
- [ ] **TagsInput** — Editable token collection; includes TokenField and Tokenizer. [A][A], [M][M], [RA][RA], [AX][AX].
- [ ] **TextField** — Single-line text input; includes Input and TextInput. [K][K], [M][M], [RA][RA], [AX][AX].
- [ ] **Textarea** — Multiline text input and optional auto-resize. [M][M], [S][S], [AX][AX].
- [ ] **TimeField** — Segmented time input, including paired range fields and locale-aware validation. [K][K], [RA][RA], [MXP][MXP], [AX][AX].
- [ ] **TimePicker** — Time input with clock/list selection overlay, including time ranges; composes TimeField. [MXP][MXP], [AD][AD].
- [ ] **Timeline** — Chronological event presentation. [M][M].
- [ ] **Timer** — Elapsed-duration/stopwatch presentation with cleanup, background-tab accuracy and quiet screen-reader updates; distinct from calendar time and countdown metrics. [AXT][AXT].
- [ ] **Timestamp** — Localized absolute/relative time display with explicit timezone policy, accessible full dates and hydration-safe updates. [AXC][AXC].
- [ ] **Toast** — Transient notifications and live announcements. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **ToggleButton** — Pressed/unpressed action; includes Toggle. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **ToggleGroup** — Related toggle actions with single/multiple selection. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **Toolbar** — Grouped actions with keyboard navigation. [R][R], [M][M], [RA][RA], [AX][AX].
- [x] **Tooltip** — Non-interactive supplementary label/help. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Tour** — Optional guided feature walkthrough. [A][A], [M][M].
- [ ] **TransferList** — Move selected options between available/chosen lists; includes Transfer. [MU][MU], [AD][AD].
- [ ] **TreeSelect** — Searchable hierarchical picker in a popup, including multiple/checkable selection. [ADT][ADT].
- [ ] **TreeView** — Visible hierarchical navigation/selection; includes Tree, TreeList and NavigationTree, not TreeSelect. [A][A], [M][M], [RA][RA], [AX][AX].
- [ ] **Typography** — Heading, Paragraph, Text and Prose are implemented. Quote and highlighted text presets are pending. [M][M], [S][S], [AX][AX].
- [ ] **Virtualizer** — Window large collections; compose with lists/tables/trees. [RA][RA].
- [ ] **VisuallyHidden** — Screen-reader-only content utility. [R][R], [M][M], [AX][AX].

## Official sources

The linked documentation inventories were inspected directly. References cover
both accessible behavior primitives and styled component libraries; names above
are normalized rather than copied wholesale.

[AX]: https://astryx.atmeta.com/components
[AXB]: https://astryx.atmeta.com/blog/astryx-v0-7-0
[AXC]: https://astryx.atmeta.com/changelog
[AXT]: https://astryx.atmeta.com/components/Timer
[AXR]: https://astryx.atmeta.com/components/RichTextEditor

[R]: https://www.radix-ui.com/primitives/docs/overview/introduction
[K]: https://kobalte.dev/docs/core/overview/introduction
[A]: https://ark-ui.com/docs/components/accordion
[RA]: https://react-aria.adobe.com/getting-started
[M]: https://mantine.dev/core/package/
[S]: https://ui.shadcn.com/docs/components
[AD]: https://ant.design/components/overview/
[ADI]: https://ant.design/components/image/
[ADT]: https://ant.design/components/tree-select/
[ADU]: https://ant.design/components/upload/
[MU]: https://mui.com/material-ui/all-components/
[MXG]: https://mui.com/x/react-data-grid/
[MXP]: https://mui.com/x/react-date-pickers/
[MRT]: https://mantine.dev/x/tiptap/

- [Ant Design][AD]: enterprise inputs, selection and data display; [image preview][ADI], [tree selection][ADT] and [upload UI][ADU].
- [Astryx][AX]: additional application patterns; [release notes][AXB],
  [change log][AXC], [Timer][AXT] and [RichTextEditor][AXR] inform the new scopes.
- [Ark UI][A]: cross-framework interaction primitives (component index in sidebar).
- [Kobalte][K]: Solid-oriented accessible primitives.
- [Mantine][M]: styled controls, layout and application utilities.
- [Material UI][MU] and MUI X: [editable data grids][MXG] and [date/time/range inputs][MXP].
- [Mantine RichTextEditor][MRT]: optional editor integration scope.
- [Radix Primitives][R]: overlay, selection and focus patterns.
- [React Aria][RA]: collection, input, internationalization and accessibility patterns.
- [shadcn/ui][S]: composed application controls and presentation patterns.

## Astryx reconciliation (2026-11-08)

Astryx's [catalog][AX] is a design reference, not a dependency migration: it
uses React 19+ and StyleX, while iu stays on Solid 2 and vanilla-extract.
The additions above are proposed iu scopes, not promised Astryx API parity.

- Add Citation, Markdown, PowerSearch, Timer and Timestamp as distinct patterns.
- Fold equivalent names and variants into existing entries, including grouped
  avatars, interactive cards, navigation, tokens and table-selection actions.
- Keep FormLayout, Section and Layout as compositions of Form/Fieldset,
  Typography, Grid and Stack. Icon remains the existing shared adapter, not a
  separate icon library task; preserve the Material Symbols guidance.
- Treat ComplexSelector as a composition of Select/Combobox and custom option
  content, pending a concrete use case rather than another overlapping API.
  Overlay infrastructure belongs with Portal, FocusTrap and the overlay family.
- Include reusable chat patterns following the expanded scope below; keep
  deprecated BottomSheetSwitcher and implementation subparts out of the inventory.
  Do not import the advertised component count.

The catalog and linked release/reference pages were inspected. Several detailed
component pages returned only a heading or were unavailable to the reader, so
this update does not claim a full API or accessibility audit of Astryx.

## Chat and AI interaction scope (2026-11-08)

The follow-up expands the inventory to include reusable chat UI, using Astryx's
[chat catalog][AX] and [change log][AXC] as references. These are proposed iu
contracts, not an Astryx port or a commitment to every advertised API.

- Keep five component families: ChatComposer, ChatLayout, ChatMessage,
  ChatSystemMessage and ChatToolCalls. Fold message metadata, send/stop buttons,
  typing indicators and scroll controls into their owning family instead of
  tracking every slot as a separate component.
- Reuse Avatar, Timestamp, Markdown, Code, Citation, FileUpload and existing
  action/disclosure primitives. Suggested prompts can start as ButtonGroup
  compositions; rich-text and speech/dictation engines are not required for the
  first composer. Long-history virtualization is optional and must be evaluated
  with Virtualizer rather than silently included in ChatLayout's estimate.
- Keep controlled transcript/draft/tool state and application callbacks explicit.
  UI does not execute tools or grant permissions. Applications own persistence,
  streaming protocols, model providers, tool approval policy and redaction of
  private arguments/results. Render supplied content through safe text/Markdown
  boundaries; never execute code or HTML received from a model or tool.

Before stabilizing APIs, use `apps/lab` for a deterministic mock conversation:

- Exercise empty, loading, populated and failed conversations; preserve a draft
  through send failure, reject duplicate sends, and test stop/retry with stale
  stream events so cancelled work cannot update a newer response.
- Test multiline input and Korean IME composition, keyboard-only attachments
  and suggestions, and mobile viewport/composer resizing.
- Stream text while following the bottom and while reading older messages;
  prepend history without jumping, resume via a visible control, and keep hidden
  controls and collapsed details out of the tab order.
- Show grouped parallel tool calls, an approval request, rejected/cancelled and
  failed calls, and large outputs. Verify focus after expansion/collapse and
  announce meaningful status changes without reading every streamed token.
- Cover long code/Markdown, citations, attachment failure, RTL, reduced motion,
  narrow layouts and reset-CSS consumers. Move stable examples into `apps/docs`
  and automated consumer tests; lab demos alone do not complete checklist items.
