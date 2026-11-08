# Component TODO

Candidate inventory researched on 2026-11-04 for `packages/iu`, with examples
and documentation intended for `apps/docs`. This is a planning checklist, not a
commitment to ship every item or an implementation order. All entries remain
unchecked; the repository currently provides style/token foundations only.

Names are provisional PascalCase APIs, sorted globally A–Z without category
breaks. Each line links to official reference inventories. Descriptions state
the proposed iu scope, not a claim that every reference has identical behavior.
Equivalent names and simple variants are folded into one entry. Distinct
interaction patterns remain separate: Select/Combobox/Listbox,
Dialog/AlertDialog, and Table/DataTable/DataGrid are not interchangeable.

Prioritize rieul.app's settings, navigation, overlays, commands and collections
when choosing the first implementation batch. Charts, image editing, signatures
and tours should wait for concrete application needs. Product-specific chat/AI
blocks, editor engines, marketing animation and backend upload logic are outside
this generic inventory. Rich text is an optional integration surface, not a new
editor engine; range selection is scoped within the matching date/time entry. Layout and accessibility utilities are included where
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
- [ ] **Alert** — Inline status or warning. [K][K], [M][M], [S][S].
- [ ] **AlertDialog** — Confirmation requiring an explicit decision. [R][R], [K][K], [S][S].
- [ ] **AppShell** — Application header, navigation and content layout. [M][M].
- [ ] **AspectRatio** — Content constrained to a ratio. [R][R], [M][M], [S][S].
- [ ] **Avatar** — User image with initials fallback. [R][R], [A][A], [M][M].
- [ ] **Badge** — Compact status or count. [K][K], [M][M], [S][S].
- [ ] **BottomNavigation** — Compact navigation among top-level destinations on small screens. [MU][MU].
- [ ] **Breadcrumbs** — Hierarchical navigation trail. [K][K], [M][M], [S][S].
- [x] **Button** — Actions, including icon-only, close and loading variants. [K][K], [M][M], [S][S].
- [x] **ButtonGroup** — Related actions sharing a visual boundary. [S][S].
- [ ] **Calendar** — Date selection surface; includes range selection. [RA][RA], [S][S].
- [ ] **Card** — Grouped content surface; includes Paper. [M][M], [S][S].
- [ ] **Carousel** — Navigable sequence of slides. [A][A], [S][S].
- [ ] **Cascader** — Selection through dependent hierarchical options. [M][M].
- [ ] **Chart** — Optional visualization adapters; assess bundle cost first. [S][S].
- [ ] **Checkbox** — Boolean and indeterminate input, including groups. [R][R], [K][K], [RA][RA].
- [ ] **Clipboard** — Copy action and success/failure feedback; includes CopyButton. [A][A], [M][M].
- [ ] **Code** — Inline code and block presentation. [M][M], [S][S].
- [ ] **Collapsible** — Single disclosure; includes Collapse and Disclosure. [R][R], [K][K], [RA][RA].
- [ ] **ColorArea** — Two-dimensional color adjustment. [K][K], [RA][RA].
- [ ] **ColorField** — Editable color value and channel fields. [K][K], [RA][RA].
- [ ] **ColorPicker** — Composed color selection, including swatch selection. [A][A], [M][M], [RA][RA].
- [ ] **ColorSlider** — Color channel adjustment, including hue and alpha. [K][K], [M][M], [RA][RA].
- [ ] **ColorSwatch** — Color sample with accessible labeling. [K][K], [M][M], [RA][RA].
- [ ] **ColorWheel** — Hue selection on a wheel. [K][K], [RA][RA].
- [ ] **Combobox** — Editable suggestions; includes Autocomplete and multi-selection. [K][K], [A][A], [RA][RA].
- [ ] **CommandPalette** — Searchable commands and keyboard actions. [S][S].
- [ ] **ContextMenu** — Pointer- or keyboard-invoked contextual actions. [R][R], [K][K], [S][S].
- [ ] **DataGrid** — Cell navigation/editing, column resizing and virtualized data; beyond a sortable DataTable. [MXG][MXG].
- [ ] **DataList** — Label/value details. [M][M].
- [ ] **DataTable** — Sorting, filtering and selection built on Table. [S][S].
- [ ] **DateField** — Segmented date input and paired range fields; includes DateInput. [A][A], [RA][RA], [MXP][MXP].
- [ ] **DatePicker** — Date/calendar selection including ranges and month/year granularity. [RA][RA], [MXP][MXP], [AD][AD].
- [ ] **DateTimePicker** — Combined date/time input and overlay, including ranges and timezone policy. [MXP][MXP].
- [ ] **Dialog** — Modal/non-modal dialog; includes Modal. [R][R], [K][K], [A][A].
- [ ] **Drawer** — Edge-attached panel; includes Sheet and bottom sheet. [A][A], [M][M], [S][S].
- [ ] **Editable** — Inline text editing with commit/cancel. [A][A].
- [ ] **EmptyState** — Empty results and recovery action; includes Empty. [M][M], [S][S].
- [ ] **Field** — Label, description and validation message composition. [A][A], [S][S].
- [ ] **Fieldset** — Semantically grouped related fields. [A][A], [M][M].
- [ ] **FileUpload** — Picker/drop zone with file list, validation and progress/cancel UI; transport remains app-owned. [A][A], [RA][RA], [ADU][ADU].
- [ ] **FloatingPanel** — Movable/resizable desktop panel; includes FloatingWindow. [A][A], [M][M].
- [ ] **FocusTrap** — Focus containment and restoration utility. [A][A], [M][M].
- [ ] **Form** — Native submission and validation coordination. [R][R], [RA][RA].
- [ ] **Grid** — Responsive columns, including SimpleGrid. [M][M].
- [ ] **GridList** — Interactive item collection with grid keyboard navigation. [RA][RA].
- [ ] **HoverCard** — Supplementary preview; includes PreviewTrigger. [R][R], [K][K], [RA][RA].
- [ ] **Image** — Inline image with alt text, loading and failure presentation; previews use ImageViewer. [K][K], [ADI][ADI].
- [ ] **ImageCropper** — Image crop selection; evaluate only when needed. [A][A].
- [ ] **ImageViewer** — Modal image/gallery preview with zoom, pan and navigation; includes Lightbox. [ADI][ADI].
- [ ] **Indicator** — Small status marker attached to another element. [M][M].
- [ ] **InputGroup** — Leading/trailing text, icons or actions around inputs. [S][S].
- [ ] **KeyboardKey** — Shortcut key presentation; includes Kbd. [M][M], [S][S].
- [ ] **Link** — Accessible navigation; includes Anchor and NavLink. [K][K], [M][M], [RA][RA].
- [ ] **List** — Static ordered/unordered content. [M][M].
- [ ] **Listbox** — Visible selectable options, including multiple selection. [A][A], [RA][RA].
- [ ] **LoadingOverlay** — Loading state over an existing region. [M][M].
- [ ] **MaskedField** — Formatted text entry; includes MaskInput. [M][M].
- [ ] **Masonry** — Variable-height items arranged in columns; distinct from aligned Grid. [MU][MU], [AD][AD].
- [ ] **Mentions** — Text entry with triggered entity suggestions and insertion. [AD][AD].
- [ ] **Menubar** — Persistent application menu bar. [R][R], [K][K], [M][M].
- [ ] **MenuButton** — Triggered action menu; includes DropdownMenu and Menu. [R][R], [K][K], [A][A].
- [ ] **Meter** — Bounded measurement, distinct from task progress. [K][K], [RA][RA].
- [ ] **NavigationMenu** — Site/section navigation with expandable groups. [R][R], [K][K], [A][A].
- [ ] **NumberField** — Numeric entry with optional stepping; includes NumberInput. [K][K], [A][A], [RA][RA].
- [ ] **OverflowList** — Collapse excess items into an overflow affordance. [M][M].
- [ ] **Pagination** — Navigation through result pages. [K][K], [A][A], [M][M].
- [ ] **PasswordField** — Password entry with visibility toggle. [R][R], [A][A], [M][M].
- [ ] **PinInput** — Segmented PIN/OTP entry; includes InputOTP. [R][R], [A][A], [M][M].
- [ ] **Popover** — Anchored interactive overlay. [R][R], [K][K], [A][A].
- [ ] **Portal** — Render outside the current DOM subtree; preserve theme context. [R][R], [M][M].
- [ ] **Progress** — Determinate/indeterminate progress, linear and circular. [R][R], [A][A], [M][M].
- [ ] **QRCode** — Pairing/share code display; optional encoding dependency. [A][A].
- [ ] **RadioGroup** — Single choice from a visible set. [R][R], [K][K], [A][A].
- [ ] **Rating** — Rating input/display; includes RatingGroup. [K][K], [A][A], [M][M].
- [ ] **Result** — Page-level success/error outcome with recovery actions, distinct from empty data. [AD][AD].
- [ ] **RichTextEditor** — Optional editor adapter and formatting toolbar; assess Solid 2, IME, document safety and bundle cost. [MRT][MRT].
- [ ] **ScrollArea** — Scrollable region and scrollbar presentation. [R][R], [K][K], [A][A].
- [ ] **SearchField** — Search input with clear and submission behavior. [K][K], [RA][RA].
- [ ] **SegmentedControl** — Compact single-choice control; includes SegmentGroup. [K][K], [A][A], [M][M].
- [ ] **Select** — Non-editable option picker; retain a native-select variant. [R][R], [K][K], [M][M].
- [ ] **Separator** — Visual/semantic division; includes Divider. [R][R], [K][K], [M][M].
- [ ] **Sidebar** — Collapsible application navigation panel. [S][S].
- [ ] **SignaturePad** — Pointer signature capture; optional specialist component. [A][A].
- [ ] **Skeleton** — Content-shaped loading placeholders. [K][K], [M][M], [S][S].
- [ ] **Slider** — Scalar/range adjustment; include angle variant if needed. [R][R], [A][A], [M][M].
- [ ] **SpeedDial** — Expandable group of floating actions; simple floating buttons remain Button variants. [MU][MU].
- [ ] **Spinner** — Indeterminate activity indicator; includes Loader. [M][M], [S][S].
- [ ] **Splitter** — Resizable panels; includes Resizable. [A][A], [M][M], [S][S].
- [ ] **Stack** — Row/column layout with spacing; includes Flex and Group. [M][M].
- [ ] **Statistic** — Labeled metric with units and optional trend; includes countdown presentation. [AD][AD].
- [ ] **Stepper** — Multi-step workflow status/navigation; includes Steps. [A][A], [M][M].
- [ ] **Switch** — Immediate on/off setting. [R][R], [K][K], [A][A].
- [ ] **Table** — Semantic tabular display, foundation for DataTable. [M][M], [RA][RA], [S][S].
- [ ] **TableOfContents** — Navigation derived from document headings. [A][A], [M][M].
- [ ] **Tabs** — Switch between associated content panels. [R][R], [K][K], [A][A].
- [ ] **Tag** — Removable/selectable tokens; includes Chip, Pill and TagGroup. [M][M], [RA][RA].
- [ ] **TagsInput** — Editable token collection; includes TokenField. [A][A], [M][M], [RA][RA].
- [ ] **Textarea** — Multiline text input and optional auto-resize. [M][M], [S][S].
- [ ] **TextField** — Single-line text input; includes Input and TextInput. [K][K], [M][M], [RA][RA].
- [ ] **TimeField** — Segmented time input, including paired range fields and locale-aware validation. [K][K], [RA][RA], [MXP][MXP].
- [ ] **Timeline** — Chronological event presentation. [M][M].
- [ ] **TimePicker** — Time input with clock/list selection overlay, including time ranges; composes TimeField. [MXP][MXP], [AD][AD].
- [ ] **Toast** — Transient notifications and live announcements. [R][R], [K][K], [A][A].
- [ ] **ToggleButton** — Pressed/unpressed action; includes Toggle. [R][R], [K][K], [RA][RA].
- [ ] **ToggleGroup** — Related toggle actions with single/multiple selection. [R][R], [K][K], [RA][RA].
- [ ] **Toolbar** — Grouped actions with keyboard navigation. [R][R], [M][M], [RA][RA].
- [ ] **Tooltip** — Non-interactive supplementary label/help. [R][R], [K][K], [A][A].
- [ ] **Tour** — Optional guided feature walkthrough. [A][A], [M][M].
- [ ] **TransferList** — Move selected options between available/chosen lists; includes Transfer. [MU][MU], [AD][AD].
- [ ] **TreeSelect** — Searchable hierarchical picker in a popup, including multiple/checkable selection. [ADT][ADT].
- [ ] **TreeView** — Visible hierarchical navigation/selection; includes Tree and NavigationTree, not TreeSelect. [A][A], [M][M], [RA][RA].
- [ ] **Typography** — Text, headings, quotes and highlighted text presets. [M][M], [S][S].
- [ ] **Virtualizer** — Window large collections; compose with lists/tables/trees. [RA][RA].
- [ ] **VisuallyHidden** — Screen-reader-only content utility. [R][R], [M][M].

## Official sources

The linked documentation inventories were inspected directly. References cover
both accessible behavior primitives and styled component libraries; names above
are normalized rather than copied wholesale.

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
- [Ark UI][A]: cross-framework interaction primitives (component index in sidebar).
- [Kobalte][K]: Solid-oriented accessible primitives.
- [Mantine][M]: styled controls, layout and application utilities.
- [Material UI][MU] and MUI X: [editable data grids][MXG] and [date/time/range inputs][MXP].
- [Mantine RichTextEditor][MRT]: optional editor integration scope.
- [Radix Primitives][R]: overlay, selection and focus patterns.
- [React Aria][RA]: collection, input, internationalization and accessibility patterns.
- [shadcn/ui][S]: composed application controls and presentation patterns.
