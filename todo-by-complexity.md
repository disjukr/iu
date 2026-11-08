# Component TODO by implementation complexity

A second view of all 116 candidates in [todo.md](todo.md), assessed on
2026-11-04. The alphabetical inventory remains the source for component scope
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

## 1 — Low: presentation and native semantics

Mostly semantic markup and explicit styles, with little persistent state. Still requires accessible names, contrast, responsive behavior and reset-CSS checks.

26 candidates.

- [ ] **AspectRatio** — Content constrained to a ratio. [R][R], [M][M], [S][S].
- [ ] **Badge** — Compact status or count. [K][K], [M][M], [S][S].
- [ ] **Breadcrumbs** — Hierarchical navigation trail. [K][K], [M][M], [S][S].
- [x] **ButtonGroup** — Related actions sharing a visual boundary. [S][S].
- [ ] **Card** — Grouped content surface; includes Paper. [M][M], [S][S].
- [ ] **Code** — Inline code and block presentation. [M][M], [S][S].
- [ ] **ColorSwatch** — Color sample with accessible labeling. [K][K], [M][M], [RA][RA].
- [ ] **DataList** — Label/value details. [M][M].
- [ ] **EmptyState** — Empty results and recovery action; includes Empty. [M][M], [S][S].
- [ ] **Fieldset** — Semantically grouped related fields. [A][A], [M][M].
- [ ] **Grid** — Responsive columns, including SimpleGrid. [M][M].
- [ ] **Indicator** — Small status marker attached to another element. [M][M].
- [ ] **InputGroup** — Leading/trailing text, icons or actions around inputs. [S][S].
- [ ] **KeyboardKey** — Shortcut key presentation; includes Kbd. [M][M], [S][S].
- [ ] **Link** — Accessible navigation; includes Anchor and NavLink. [K][K], [M][M], [RA][RA].
- [ ] **List** — Static ordered/unordered content. [M][M].
- [ ] **Meter** — Bounded measurement, distinct from task progress. [K][K], [RA][RA].
- [ ] **Result** — Page-level success/error outcome with recovery actions, distinct from empty data. [AD][AD].
- [ ] **Separator** — Visual/semantic division; includes Divider. [R][R], [K][K], [M][M].
- [ ] **Skeleton** — Content-shaped loading placeholders. [K][K], [M][M], [S][S].
- [ ] **Spinner** — Indeterminate activity indicator; includes Loader. [M][M], [S][S].
- [ ] **Stack** — Row/column layout with spacing; includes Flex and Group. [M][M].
- [ ] **Table** — Semantic tabular display, foundation for DataTable. [M][M], [RA][RA], [S][S].
- [ ] **Timeline** — Chronological event presentation. [M][M].
- [ ] **Typography** — Text, headings, quotes and highlighted text presets. [M][M], [S][S].
- [ ] **VisuallyHidden** — Screen-reader-only content utility. [R][R], [M][M].

## 2 — Moderate: bounded state and native controls

Small state machines or native inputs, labels and validation associations. Loading, media failure, platform APIs or measurement add tests without a large composite interaction model.

22 candidates.

- [ ] **Alert** — Inline status or warning. [K][K], [M][M], [S][S].
- [ ] **Avatar** — User image with initials fallback. [R][R], [A][A], [M][M].
- [ ] **BottomNavigation** — Compact navigation among top-level destinations on small screens. [MU][MU].
- [x] **Button** — Actions, including icon-only, close and loading variants. [K][K], [M][M], [S][S].
- [ ] **Checkbox** — Boolean and indeterminate input, including groups. [R][R], [K][K], [RA][RA].
- [ ] **Clipboard** — Copy action and success/failure feedback; includes CopyButton. [A][A], [M][M].
- [ ] **Collapsible** — Single disclosure; includes Collapse and Disclosure. [R][R], [K][K], [RA][RA].
- [ ] **Editable** — Inline text editing with commit/cancel. [A][A].
- [ ] **Field** — Label, description and validation message composition. [A][A], [S][S].
- [ ] **Image** — Inline image with alt text, loading and failure presentation; previews use ImageViewer. [K][K], [ADI][ADI].
- [ ] **LoadingOverlay** — Loading state over an existing region. [M][M].
- [ ] **Pagination** — Navigation through result pages. [K][K], [A][A], [M][M].
- [ ] **PasswordField** — Password entry with visibility toggle. [R][R], [A][A], [M][M].
- [ ] **Portal** — Render outside the current DOM subtree; preserve theme context. [R][R], [M][M].
- [ ] **Progress** — Determinate/indeterminate progress, linear and circular. [R][R], [A][A], [M][M].
- [ ] **QRCode** — Pairing/share code display; optional encoding dependency. [A][A].
- [ ] **SearchField** — Search input with clear and submission behavior. [K][K], [RA][RA].
- [ ] **Statistic** — Labeled metric with units and optional trend; includes countdown presentation. [AD][AD].
- [ ] **Switch** — Immediate on/off setting. [R][R], [K][K], [A][A].
- [ ] **Textarea** — Multiline text input and optional auto-resize. [M][M], [S][S].
- [ ] **TextField** — Single-line text input; includes Input and TextInput. [K][K], [M][M], [RA][RA].
- [ ] **ToggleButton** — Pressed/unpressed action; includes Toggle. [R][R], [K][K], [RA][RA].

## 3 — Substantial: composite interaction or adaptive layout

Coordinated focus/selection, keyboard navigation, pointer input, responsive measurement or multiple controlled parts. Assumes tested lower-level primitives can be reused.

23 candidates.

- [ ] **Accordion** — Expandable sections; includes DisclosureGroup. [R][R], [K][K], [A][A].
- [ ] **AppShell** — Application header, navigation and content layout. [M][M].
- [ ] **ColorField** — Editable color value and channel fields. [K][K], [RA][RA].
- [ ] **ColorSlider** — Color channel adjustment, including hue and alpha. [K][K], [M][M], [RA][RA].
- [ ] **Form** — Native submission and validation coordination. [R][R], [RA][RA].
- [ ] **Masonry** — Variable-height items arranged in columns; distinct from aligned Grid. [MU][MU], [AD][AD].
- [ ] **NumberField** — Numeric entry with optional stepping; includes NumberInput. [K][K], [A][A], [RA][RA].
- [ ] **OverflowList** — Collapse excess items into an overflow affordance. [M][M].
- [ ] **RadioGroup** — Single choice from a visible set. [R][R], [K][K], [A][A].
- [ ] **Rating** — Rating input/display; includes RatingGroup. [K][K], [A][A], [M][M].
- [ ] **ScrollArea** — Scrollable region and scrollbar presentation. [R][R], [K][K], [A][A].
- [ ] **SegmentedControl** — Compact single-choice control; includes SegmentGroup. [K][K], [A][A], [M][M].
- [ ] **Sidebar** — Collapsible application navigation panel. [S][S].
- [ ] **Slider** — Scalar/range adjustment; include angle variant if needed. [R][R], [A][A], [M][M].
- [ ] **SpeedDial** — Expandable group of floating actions; simple floating buttons remain Button variants. [MU][MU].
- [ ] **Splitter** — Resizable panels; includes Resizable. [A][A], [M][M], [S][S].
- [ ] **Stepper** — Multi-step workflow status/navigation; includes Steps. [A][A], [M][M].
- [ ] **TableOfContents** — Navigation derived from document headings. [A][A], [M][M].
- [ ] **Tabs** — Switch between associated content panels. [R][R], [K][K], [A][A].
- [ ] **Tag** — Removable/selectable tokens; includes Chip, Pill and TagGroup. [M][M], [RA][RA].
- [ ] **ToggleGroup** — Related toggle actions with single/multiple selection. [R][R], [K][K], [RA][RA].
- [ ] **Toolbar** — Grouped actions with keyboard navigation. [R][R], [M][M], [RA][RA].
- [ ] **Tooltip** — Non-interactive supplementary label/help. [R][R], [K][K], [A][A].

## 4 — High: overlays, collections and platform edge cases

Nested focus/dismissal, asynchronous or multi-selection state, gestures, input-method behavior, positioning or browser differences interact. Composed UI still needs end-to-end behavior tests.

28 candidates.

- [ ] **AlertDialog** — Confirmation requiring an explicit decision. [R][R], [K][K], [S][S].
- [ ] **Carousel** — Navigable sequence of slides. [A][A], [S][S].
- [ ] **ColorArea** — Two-dimensional color adjustment. [K][K], [RA][RA].
- [ ] **ColorWheel** — Hue selection on a wheel. [K][K], [RA][RA].
- [ ] **CommandPalette** — Searchable commands and keyboard actions. [S][S].
- [ ] **ContextMenu** — Pointer- or keyboard-invoked contextual actions. [R][R], [K][K], [S][S].
- [ ] **DataTable** — Sorting, filtering and selection built on Table. [S][S].
- [ ] **Dialog** — Modal/non-modal dialog; includes Modal. [R][R], [K][K], [A][A].
- [ ] **Drawer** — Edge-attached panel; includes Sheet and bottom sheet. [A][A], [M][M], [S][S].
- [ ] **FileUpload** — Picker/drop zone with file list, validation and progress/cancel UI; transport remains app-owned. [A][A], [RA][RA], [ADU][ADU].
- [ ] **FloatingPanel** — Movable/resizable desktop panel; includes FloatingWindow. [A][A], [M][M].
- [ ] **FocusTrap** — Focus containment and restoration utility. [A][A], [M][M].
- [ ] **GridList** — Interactive item collection with grid keyboard navigation. [RA][RA].
- [ ] **HoverCard** — Supplementary preview; includes PreviewTrigger. [R][R], [K][K], [RA][RA].
- [ ] **ImageViewer** — Modal image/gallery preview with zoom, pan and navigation; includes Lightbox. [ADI][ADI].
- [ ] **Listbox** — Visible selectable options, including multiple selection. [A][A], [RA][RA].
- [ ] **MaskedField** — Formatted text entry; includes MaskInput. [M][M].
- [ ] **Menubar** — Persistent application menu bar. [R][R], [K][K], [M][M].
- [ ] **MenuButton** — Triggered action menu; includes DropdownMenu and Menu. [R][R], [K][K], [A][A].
- [ ] **NavigationMenu** — Site/section navigation with expandable groups. [R][R], [K][K], [A][A].
- [ ] **PinInput** — Segmented PIN/OTP entry; includes InputOTP. [R][R], [A][A], [M][M].
- [ ] **Popover** — Anchored interactive overlay. [R][R], [K][K], [A][A].
- [ ] **Select** — Non-editable option picker; retain a native-select variant. [R][R], [K][K], [M][M].
- [ ] **SignaturePad** — Pointer signature capture; optional specialist component. [A][A].
- [ ] **TagsInput** — Editable token collection; includes TokenField. [A][A], [M][M], [RA][RA].
- [ ] **Toast** — Transient notifications and live announcements. [R][R], [K][K], [A][A].
- [ ] **TransferList** — Move selected options between available/chosen lists; includes Transfer. [MU][MU], [AD][AD].
- [ ] **TreeView** — Visible hierarchical navigation/selection; includes Tree and NavigationTree, not TreeSelect. [A][A], [M][M], [RA][RA].

## 5 — Very high: specialized models and integrations

Complex text/date/color models, hierarchical selection, virtualization, editing or external engines. Range inputs, localization/timezones, IME, accessibility and dependency compatibility can substantially change the effort.

17 candidates.

- [ ] **Calendar** — Date selection surface; includes range selection. [RA][RA], [S][S].
- [ ] **Cascader** — Selection through dependent hierarchical options. [M][M].
- [ ] **Chart** — Optional visualization adapters; assess bundle cost first. [S][S].
- [ ] **ColorPicker** — Composed color selection, including swatch selection. [A][A], [M][M], [RA][RA].
- [ ] **Combobox** — Editable suggestions; includes Autocomplete and multi-selection. [K][K], [A][A], [RA][RA].
- [ ] **DataGrid** — Cell navigation/editing, column resizing and virtualized data; beyond a sortable DataTable. [MXG][MXG].
- [ ] **DateField** — Segmented date input and paired range fields; includes DateInput. [A][A], [RA][RA], [MXP][MXP].
- [ ] **DatePicker** — Date/calendar selection including ranges and month/year granularity. [RA][RA], [MXP][MXP], [AD][AD].
- [ ] **DateTimePicker** — Combined date/time input and overlay, including ranges and timezone policy. [MXP][MXP].
- [ ] **ImageCropper** — Image crop selection; evaluate only when needed. [A][A].
- [ ] **Mentions** — Text entry with triggered entity suggestions and insertion. [AD][AD].
- [ ] **RichTextEditor** — Optional editor adapter and formatting toolbar; assess Solid 2, IME, document safety and bundle cost. [MRT][MRT].
- [ ] **TimeField** — Segmented time input, including paired range fields and locale-aware validation. [K][K], [RA][RA], [MXP][MXP].
- [ ] **TimePicker** — Time input with clock/list selection overlay, including time ranges; composes TimeField. [MXP][MXP], [AD][AD].
- [ ] **Tour** — Optional guided feature walkthrough. [A][A], [M][M].
- [ ] **TreeSelect** — Searchable hierarchical picker in a popup, including multiple/checkable selection. [ADT][ADT].
- [ ] **Virtualizer** — Window large collections; compose with lists/tables/trees. [RA][RA].

## Source references

See [the research notes in todo.md](todo.md#official-sources). References below
are repeated so each checklist entry remains clickable in this view.

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
