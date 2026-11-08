# Component TODO by implementation complexity

A second view of all 126 candidates in [todo.md](todo.md), assessed on
2026-11-04 and updated on 2026-11-08. The alphabetical inventory remains the source for component scope
and research references. Keep names, scope and checkbox status synchronized
when either checklist changes.

These tiers are estimates of implementation complexity for the documented
scope: accessibility and keyboard behavior, state coordination, layout and
measurement, browser/platform differences, and dependency integration. They are
not implementation priorities, delivery phases, time estimates or a committed
schedule. Tiers run from lower to higher complexity; names within each tier are
alphabetical and do not imply an effort ranking among peers.

The estimate covers the full listed scope, including variants and ranges, not
just a happy-path demo. It assumes Solid 2, TypeScript, ESM-only packaging,
vanilla-extract and the existing tokens/styles. Reusing a proven primitive can
reduce effort, but its Solid 2 compatibility, accessibility and integration
still need verification. Dependencies between items can cross tiers: tier order
is not a build order. For example, Dialog can reuse FocusTrap, and ColorPicker
can reuse ColorArea/ColorSlider. A native-only Select would be simpler than the
custom picker covered here; a native scroller would be simpler than ScrollArea.
RichTextEditor estimates an adapter, not building an editor engine from scratch.

Low complexity never waives accessibility, reset-CSS resistance, documentation
or tests. Reassess tiers when API scope, browser support or dependency choices
change; the estimates below are iu planning judgments, not claims from the
reference libraries.

Astryx reconciliation adds Timer to tier 2, Citation and Timestamp to tier 3,
and Markdown and PowerSearch to tier 5. Card moves to tier 3 for interactive
variants, and Avatar moves to tier 3 for group overflow. These are iu estimates;
adding a reference alone does not mark an implementation complete.

The chat follow-up adds ChatSystemMessage to tier 2, ChatMessage to tier 3,
ChatLayout and ChatToolCalls to tier 4, and ChatComposer to tier 5. Composer
complexity includes IME, attachments and triggered suggestions; layout includes
streaming scroll coordination but not virtualization. Tool-call UI estimates
state presentation and accessible disclosures, not an execution/agent engine.
See [the chat scope and lab scenarios](todo.md#chat-and-ai-interaction-scope-2026-11-08).

## 1 — Low: presentation and native semantics

Mostly semantic markup and explicit styles, with little persistent state. Still requires accessible names, contrast, responsive behavior and reset-CSS checks.

25 candidates.

- [ ] **AspectRatio** — Content constrained to a ratio. [R][R], [M][M], [S][S], [AX][AX].
- [ ] **Badge** — Compact status or count. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **Breadcrumbs** — Hierarchical navigation trail. [K][K], [M][M], [S][S], [AX][AX].
- [x] **ButtonGroup** — Related actions sharing a visual boundary. [S][S], [AX][AX].
- [ ] **Code** — Inline code and block presentation. CodeBlock implemented; inline code pending. [M][M], [S][S], [AX][AX].
- [ ] **ColorSwatch** — Color sample with accessible labeling. [K][K], [M][M], [RA][RA].
- [ ] **DataList** — Label/value details; includes MetadataList. [M][M], [AX][AX].
- [ ] **EmptyState** — Empty results and recovery action; includes Empty. [M][M], [S][S], [AX][AX].
- [ ] **Fieldset** — Semantically grouped related fields. [A][A], [M][M].
- [ ] **Grid** — Responsive columns, including SimpleGrid. [M][M], [AX][AX].
- [ ] **Indicator** — Small status marker, standalone or attached to another element; includes StatusDot. [M][M], [AX][AX].
- [ ] **InputGroup** — Leading/trailing text, icons or actions around inputs. [S][S].
- [ ] **KeyboardKey** — Shortcut key presentation; includes Kbd. [M][M], [S][S], [AX][AX].
- [ ] **Link** — Accessible navigation; includes Anchor and NavLink. [K][K], [M][M], [RA][RA], [AX][AX].
- [ ] **List** — Static ordered/unordered content. [M][M], [AX][AX].
- [ ] **Meter** — Bounded measurement, distinct from task progress. [K][K], [RA][RA].
- [ ] **Result** — Page-level success/error outcome with recovery actions, distinct from empty data. [AD][AD].
- [ ] **Separator** — Visual/semantic division; includes Divider. [R][R], [K][K], [M][M], [AX][AX].
- [ ] **Skeleton** — Content-shaped loading placeholders. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **Spinner** — Indeterminate activity indicator; includes Loader. [M][M], [S][S], [AX][AX].
- [ ] **Stack** — Row/column layout with spacing; includes Flex and Group. [M][M], [AX][AX].
- [ ] **Table** — Semantic tabular display, foundation for DataTable. [M][M], [RA][RA], [S][S], [AX][AX].
- [ ] **Timeline** — Chronological event presentation. [M][M].
- [ ] **Typography** — Text, headings, quotes and highlighted text presets. [M][M], [S][S], [AX][AX].
- [ ] **VisuallyHidden** — Screen-reader-only content utility. [R][R], [M][M], [AX][AX].

## 2 — Moderate: bounded state and native controls

Small state machines or native inputs, labels and validation associations. Loading, media failure, platform APIs or measurement add tests without a large composite interaction model.

23 candidates.

- [ ] **Alert** — Inline status or warning; includes Banner. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **BottomNavigation** — Compact navigation among top-level destinations on small screens. [MU][MU].
- [x] **Button** — Actions, including icon-only, close and loading variants. [K][K], [M][M], [S][S], [AX][AX].
- [ ] **ChatSystemMessage** — In-transcript event/status notices and date/unread separators with wrapping and appropriate announcement behavior; distinct from participant messages and transient Toast. [AX][AX], [AXC][AXC].
- [ ] **Checkbox** — Boolean and indeterminate input, including groups. [R][R], [K][K], [RA][RA], [AX][AX].
- [x] **Clipboard** — Copy action and success/failure feedback; includes CopyButton. [A][A], [M][M].
- [ ] **Collapsible** — Single disclosure; includes Collapse and Disclosure. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **Editable** — Inline text editing with commit/cancel. [A][A].
- [ ] **Field** — Label, description and validation message composition. [A][A], [S][S], [AX][AX].
- [ ] **Image** — Inline image with alt text, loading and failure presentation; includes Thumbnail; previews use ImageViewer. [K][K], [ADI][ADI], [AX][AX].
- [ ] **LoadingOverlay** — Loading state over an existing region. [M][M].
- [ ] **Pagination** — Navigation through result pages. [K][K], [A][A], [M][M], [AX][AX].
- [ ] **PasswordField** — Password entry with visibility toggle. [R][R], [A][A], [M][M].
- [ ] **Portal** — Render outside the current DOM subtree; preserve theme context. [R][R], [M][M].
- [ ] **Progress** — Determinate/indeterminate progress, linear and circular. [R][R], [A][A], [M][M], [AX][AX].
- [ ] **QRCode** — Pairing/share code display; optional encoding dependency. [A][A].
- [ ] **SearchField** — Search input with clear and submission behavior. [K][K], [RA][RA].
- [ ] **Statistic** — Labeled metric with units and optional trend; includes countdown presentation. [AD][AD].
- [ ] **Switch** — Immediate on/off setting. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **TextField** — Single-line text input; includes Input and TextInput. [K][K], [M][M], [RA][RA], [AX][AX].
- [ ] **Textarea** — Multiline text input and optional auto-resize. [M][M], [S][S], [AX][AX].
- [ ] **Timer** — Elapsed-duration/stopwatch presentation with cleanup, background-tab accuracy and quiet screen-reader updates; distinct from calendar time and countdown metrics. [AXT][AXT].
- [ ] **ToggleButton** — Pressed/unpressed action; includes Toggle. [R][R], [K][K], [RA][RA], [AX][AX].

## 3 — Substantial: composite interaction or adaptive layout

Coordinated focus/selection, keyboard navigation, pointer input, responsive measurement or multiple controlled parts. Assumes tested lower-level primitives can be reused.

28 candidates.

- [ ] **Accordion** — Expandable sections; includes DisclosureGroup. [R][R], [K][K], [A][A].
- [ ] **AppShell** — Application header, navigation and content layout. [M][M], [AX][AX].
- [ ] **Avatar** — User image with initials fallback; includes grouped avatars and overflow count. [R][R], [A][A], [M][M], [AX][AX].
- [ ] **Card** — Grouped content surface; includes Paper and clickable/selectable variants with native action/selection semantics. [M][M], [S][S], [AX][AX].
- [ ] **ChatMessage** — Participant message presentation with body slots, author/avatar, timestamp and delivery metadata, attachments and copy/retry/feedback actions; reuse Markdown, Citation and existing controls; includes ChatMessageMetadata. [AX][AX], [AXC][AXC].
- [ ] **Citation** — Source-reference link/marker with an optional accessible detail preview; compose Link and Popover rather than a chat-only block. [AX][AX].
- [ ] **ColorField** — Editable color value and channel fields. [K][K], [RA][RA].
- [ ] **ColorSlider** — Color channel adjustment, including hue and alpha. [K][K], [M][M], [RA][RA].
- [ ] **Form** — Native submission and validation coordination. [R][R], [RA][RA].
- [ ] **Masonry** — Variable-height items arranged in columns; distinct from aligned Grid. [MU][MU], [AD][AD].
- [ ] **NumberField** — Numeric entry with optional stepping; includes NumberInput. [K][K], [A][A], [RA][RA], [AX][AX].
- [ ] **OverflowList** — Collapse excess items into an overflow affordance. [M][M], [AX][AX].
- [ ] **RadioGroup** — Single choice from a visible set. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Rating** — Rating input/display; includes RatingGroup. [K][K], [A][A], [M][M].
- [ ] **ScrollArea** — Scrollable region and scrollbar presentation. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **SegmentedControl** — Compact single-choice control; includes SegmentGroup. [K][K], [A][A], [M][M], [AX][AX].
- [ ] **Sidebar** — Collapsible application navigation panel; includes SideNav. [S][S], [AX][AX].
- [ ] **Slider** — Scalar/range adjustment; include angle variant if needed. [R][R], [A][A], [M][M], [AX][AX].
- [ ] **SpeedDial** — Expandable group of floating actions; simple floating buttons remain Button variants. [MU][MU].
- [ ] **Splitter** — Resizable panels; includes Resizable and ResizeHandle. [A][A], [M][M], [S][S], [AX][AX].
- [ ] **Stepper** — Multi-step workflow status/navigation; includes Steps. [A][A], [M][M], [AX][AX].
- [ ] **TableOfContents** — Navigation derived from document headings; includes Outline. [A][A], [M][M], [AX][AX].
- [ ] **Tabs** — Switch between associated content panels. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Tag** — Removable/selectable tokens; includes Chip, Pill, Token and TagGroup. [M][M], [RA][RA], [AX][AX].
- [ ] **Timestamp** — Localized absolute/relative time display with explicit timezone policy, accessible full dates and hydration-safe updates. [AXC][AXC].
- [ ] **ToggleGroup** — Related toggle actions with single/multiple selection. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **Toolbar** — Grouped actions with keyboard navigation. [R][R], [M][M], [RA][RA], [AX][AX].
- [x] **Tooltip** — Non-interactive supplementary label/help. [R][R], [K][K], [A][A], [AX][AX].

## 4 — High: overlays, collections and platform edge cases

Nested focus/dismissal, asynchronous or multi-selection state, gestures, input-method behavior, positioning or browser differences interact. Composed UI still needs end-to-end behavior tests.

30 candidates.

- [ ] **AlertDialog** — Confirmation requiring an explicit decision. [R][R], [K][K], [S][S].
- [ ] **Carousel** — Navigable sequence of slides. [A][A], [S][S], [AX][AX].
- [ ] **ChatLayout** — Conversation viewport and composer dock with transcript semantics, history loading, new-message affordance and streaming scroll-follow that preserves manual reading position; virtualization remains a separate integration. [AX][AX], [AXC][AXC].
- [ ] **ChatToolCalls** — Expandable individual/grouped AI tool-call presentation with pending/running/success/error/cancelled states, input/output slots and optional approval/retry/cancel controls; execution, authorization and sensitive-data filtering remain app-owned. [AX][AX], [AXC][AXC].
- [ ] **ColorArea** — Two-dimensional color adjustment. [K][K], [RA][RA].
- [ ] **ColorWheel** — Hue selection on a wheel. [K][K], [RA][RA].
- [ ] **CommandPalette** — Searchable commands and keyboard actions. [S][S], [AX][AX].
- [ ] **ContextMenu** — Pointer- or keyboard-invoked contextual actions. [R][R], [K][K], [S][S].
- [ ] **DataTable** — Sorting, filtering and selection built on Table; includes a contextual selection toolbar. [S][S], [AX][AX].
- [ ] **Dialog** — Modal/non-modal dialog; includes Modal. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Drawer** — Edge-attached panel; includes Sheet and bottom sheet. [A][A], [M][M], [S][S], [AX][AX].
- [ ] **FileUpload** — Picker/drop zone with file list, validation and progress/cancel UI; transport remains app-owned. [A][A], [RA][RA], [ADU][ADU], [AX][AX].
- [ ] **FloatingPanel** — Movable/resizable desktop panel; includes FloatingWindow. [A][A], [M][M].
- [ ] **FocusTrap** — Focus containment and restoration utility. [A][A], [M][M].
- [ ] **GridList** — Interactive item collection with grid keyboard navigation. [RA][RA].
- [ ] **HoverCard** — Supplementary preview; includes PreviewTrigger. [R][R], [K][K], [RA][RA], [AX][AX].
- [ ] **ImageViewer** — Modal image/gallery preview with zoom, pan and navigation; includes Lightbox. [ADI][ADI], [AX][AX].
- [ ] **Listbox** — Visible selectable options, including multiple selection. [A][A], [RA][RA].
- [ ] **MaskedField** — Formatted text entry; includes MaskInput. [M][M].
- [ ] **MenuButton** — Triggered action menu; includes DropdownMenu, Menu and MoreMenu. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Menubar** — Persistent application menu bar. [R][R], [K][K], [M][M].
- [ ] **NavigationMenu** — Site/section navigation with expandable groups; includes TopNav and mega menus. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **PinInput** — Segmented PIN/OTP entry; includes InputOTP. [R][R], [A][A], [M][M].
- [ ] **Popover** — Anchored interactive overlay; includes focusable InfoTip help, distinct from a non-interactive Tooltip. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **Select** — Non-editable option picker with single/multiple selection; includes Selector and MultiSelector; retain a native-select variant. [R][R], [K][K], [M][M], [AX][AX].
- [ ] **SignaturePad** — Pointer signature capture; optional specialist component. [A][A].
- [ ] **TagsInput** — Editable token collection; includes TokenField and Tokenizer. [A][A], [M][M], [RA][RA], [AX][AX].
- [ ] **Toast** — Transient notifications and live announcements. [R][R], [K][K], [A][A], [AX][AX].
- [ ] **TransferList** — Move selected options between available/chosen lists; includes Transfer. [MU][MU], [AD][AD].
- [ ] **TreeView** — Visible hierarchical navigation/selection; includes Tree, TreeList and NavigationTree, not TreeSelect. [A][A], [M][M], [RA][RA], [AX][AX].

## 5 — Very high: specialized models and integrations

Complex text/date/color models, hierarchical selection, virtualization, editing or external engines. Range inputs, localization/timezones, IME, accessibility and dependency compatibility can substantially change the effort.

20 candidates.

- [ ] **Calendar** — Date selection surface; includes range selection. [RA][RA], [S][S], [AX][AX].
- [ ] **Cascader** — Selection through dependent hierarchical options. [M][M].
- [ ] **Chart** — Optional visualization adapters; assess bundle cost first. [S][S].
- [ ] **ChatComposer** — Message draft input with IME-safe submit/newline behavior, send/stop states, attachments and optional mention/command suggestions; compose Textarea, FileUpload and Mentions; transport and model selection remain app-owned. [AX][AX], [AXC][AXC].
- [ ] **ColorPicker** — Composed color selection, including swatch selection. [A][A], [M][M], [RA][RA].
- [ ] **Combobox** — Editable suggestions; includes Autocomplete, Typeahead and multi-selection. [K][K], [A][A], [RA][RA], [AX][AX].
- [ ] **DataGrid** — Cell navigation/editing, column resizing and virtualized data; beyond a sortable DataTable. [MXG][MXG].
- [ ] **DateField** — Segmented date input and paired range fields; includes DateInput. [A][A], [RA][RA], [MXP][MXP], [AX][AX].
- [ ] **DatePicker** — Date/calendar selection including ranges and month/year granularity. [RA][RA], [MXP][MXP], [AD][AD].
- [ ] **DateTimePicker** — Combined date/time input and overlay, including ranges and timezone policy. [MXP][MXP], [AX][AX].
- [ ] **ImageCropper** — Image crop selection; evaluate only when needed. [A][A].
- [ ] **Markdown** — Optional read-only Markdown renderer with component overrides; define safe URL/HTML handling, parser compatibility and bundle limits separately from RichTextEditor. [AXB][AXB].
- [ ] **Mentions** — Text entry with triggered entity suggestions and insertion. [AD][AD].
- [ ] **PowerSearch** — Structured filter builder with field/operator/value tokens, suggestions and editing; app owns query execution; distinct from SearchField and CommandPalette. [AXC][AXC].
- [ ] **RichTextEditor** — Optional editor adapter and formatting toolbar; assess Solid 2, IME, document safety and bundle cost. [MRT][MRT], [AXR][AXR].
- [ ] **TimeField** — Segmented time input, including paired range fields and locale-aware validation. [K][K], [RA][RA], [MXP][MXP], [AX][AX].
- [ ] **TimePicker** — Time input with clock/list selection overlay, including time ranges; composes TimeField. [MXP][MXP], [AD][AD].
- [ ] **Tour** — Optional guided feature walkthrough. [A][A], [M][M].
- [ ] **TreeSelect** — Searchable hierarchical picker in a popup, including multiple/checkable selection. [ADT][ADT].
- [ ] **Virtualizer** — Window large collections; compose with lists/tables/trees. [RA][RA].

## Source references

See [the research notes in todo.md](todo.md#official-sources). References below
are repeated so each checklist entry remains clickable in this view.

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

