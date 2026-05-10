/**
 * Manifest of every shipped component, used by the index grid and the
 * per-component routes. Update when registering a new component.
 */

export type ComponentMeta = {
  name: string; // kebab-case, matches route + registry key
  title: string; // PascalCase display name
  category: ComponentCategory;
  description: string; // 1-line summary; matches registry.json
};

export type ComponentCategory =
  | 'Foundation'
  | 'Layout'
  | 'Shell'
  | 'Display'
  | 'Form'
  | 'Overlay'
  | 'Feedback'
  | 'Navigation'
  | 'Data'
  | 'macOS';

export const components: ComponentMeta[] = [
  // Foundation
  {name: 'button', title: 'Button', category: 'Foundation', description: 'Primary action element with primary / ghost / outline variants.'},
  {name: 'input', title: 'Input', category: 'Foundation', description: 'Base text input primitive with leading / trailing slots.'},
  {name: 'search-input', title: 'SearchInput', category: 'Foundation', description: 'Pill search field with magnifier + ⌘K hint + clear button.'},
  {name: 'textarea', title: 'Textarea', category: 'Foundation', description: 'Multi-line text input with optional auto-resize.'},
  {name: 'label', title: 'Label', category: 'Foundation', description: 'Caption / eyebrow for form fields.'},
  {name: 'kbd', title: 'Kbd', category: 'Foundation', description: 'Keyboard shortcut hint, styled like a key cap.'},
  {name: 'spinner', title: 'Spinner', category: 'Foundation', description: 'Indeterminate progress ring (sm / md / lg).'},
  {name: 'card', title: 'Card', category: 'Foundation', description: 'Generic surface (flat / tinted variants).'},
  {name: 'separator', title: 'Separator', category: 'Foundation', description: 'Horizontal or vertical rule, solid or dashed.'},
  {name: 'skeleton', title: 'Skeleton', category: 'Foundation', description: 'Pulsing placeholder block for loading states.'},
  {name: 'avatar', title: 'Avatar', category: 'Foundation', description: 'Circular user image with initials fallback.'},
  {name: 'typography', title: 'Typography', category: 'Foundation', description: 'Preset typographic styles with tone overrides.'},
  {name: 'field', title: 'Field', category: 'Foundation', description: 'Labeled form-field wrapper with auto-id and ARIA wiring.'},
  {name: 'empty', title: 'Empty', category: 'Foundation', description: 'Empty-state placeholder with icon, title, and action.'},

  // Layout
  {name: 'container', title: 'Container', category: 'Layout', description: 'Max-width content well with auto margins.'},
  {name: 'stack', title: 'Stack', category: 'Layout', description: 'Vertical flex column with token-driven gap.'},
  {name: 'vstack', title: 'VStack', category: 'Layout', description: 'Naming-symmetric twin of HStack — vertical flex.'},
  {name: 'hstack', title: 'HStack', category: 'Layout', description: 'Horizontal flex row with optional wrap.'},
  {name: 'flex', title: 'Flex', category: 'Layout', description: 'Generic flex container with all axes exposed.'},
  {name: 'spacer', title: 'Spacer', category: 'Layout', description: 'Flex helper that fills remaining space.'},
  {name: 'center', title: 'Center', category: 'Layout', description: 'Flex container that centers children on both axes.'},
  {name: 'box', title: 'Box', category: 'Layout', description: 'Generic div with token-driven padding and radius shortcuts.'},
  {name: 'section', title: 'Section', category: 'Layout', description: 'Semantic <section> with display-font title and subtitle.'},
  {name: 'aspect-ratio', title: 'AspectRatio', category: 'Layout', description: 'Locks a child block to a fixed width:height ratio.'},
  {name: 'scroll-area', title: 'ScrollArea', category: 'Layout', description: 'Overflow container with native-feel styled scrollbars.'},

  // Shell
  {name: 'app-shell', title: 'AppShell', category: 'Shell', description: 'Full-window header / sidebar / main / footer scaffold.'},
  {name: 'sidebar', title: 'Sidebar', category: 'Shell', description: 'Collapsible side panel with header / body / footer slots.'},
  {name: 'toolbar', title: 'Toolbar', category: 'Shell', description: 'Horizontal action strip with macOS-flavored chrome.'},
  {name: 'page-header', title: 'PageHeader', category: 'Shell', description: 'Page-level header with title / eyebrow / actions.'},
  {name: 'page-body', title: 'PageBody', category: 'Shell', description: 'Page-level main content region.'},
  {name: 'page-footer', title: 'PageFooter', category: 'Shell', description: 'Page-level footer with bordered top.'},
  {name: 'resizable', title: 'Resizable', category: 'Shell', description: 'Two-pane container with a drag handle between them.'},
  {name: 'split-view', title: 'SplitView', category: 'Shell', description: 'Multi-pane container with hairline dividers (macOS).'},
  {name: 'collapsible', title: 'Collapsible', category: 'Shell', description: 'Toggle-visibility container built on bits-ui.'},
  {name: 'accordion', title: 'Accordion', category: 'Shell', description: 'Vertical stack of collapsible items.'},
  {name: 'drag-handle', title: 'DragHandle', category: 'Shell', description: 'Grip-dot indicator for resize / reorder targets.'},

  // Form
  {name: 'toggle', title: 'Toggle', category: 'Form', description: 'Pressable button with persistent on/off state.'},
  {name: 'toggle-group', title: 'ToggleGroup', category: 'Form', description: 'Set of related Toggles bound to one value.'},
  {name: 'switch', title: 'Switch', category: 'Form', description: 'Sliding on/off control (macOS-Settings shape).'},
  {name: 'checkbox', title: 'Checkbox', category: 'Form', description: 'Boolean form control with optional label.'},
  {name: 'radio-group', title: 'RadioGroup', category: 'Form', description: 'Single-select group of radio options.'},
  {name: 'slider', title: 'Slider', category: 'Form', description: 'Single-thumb range input with token-driven chrome.'},
  {name: 'number-input', title: 'NumberInput', category: 'Form', description: 'Numeric text field with ▲▼ Stepper.'},
  {name: 'pin-input', title: 'PinInput', category: 'Form', description: 'Fixed-length OTP / verification code field.'},
  {name: 'password-input', title: 'PasswordInput', category: 'Form', description: 'Input with show / hide eye toggle.'},
  {name: 'select', title: 'Select', category: 'Form', description: 'Dropdown picker built on bits-ui.'},
  {name: 'native-select', title: 'NativeSelect', category: 'Form', description: 'System <select> with our chrome.'},
  {name: 'combobox', title: 'Combobox', category: 'Form', description: 'Typeahead select with filter-as-you-type.'},
  {name: 'calendar', title: 'Calendar', category: 'Form', description: 'Month-grid date picker built on bits-ui + @internationalized/date.'},

  // Overlay
  {name: 'dialog', title: 'Dialog', category: 'Overlay', description: 'Modal overlay built on bits-ui.'},
  {name: 'alert-dialog', title: 'AlertDialog', category: 'Overlay', description: 'Confirmation modal for destructive actions.'},
  {name: 'popover', title: 'Popover', category: 'Overlay', description: 'Anchored floating panel.'},
  {name: 'tooltip', title: 'Tooltip', category: 'Overlay', description: 'Hover-triggered short label.'},
  {name: 'sheet', title: 'Sheet', category: 'Overlay', description: 'Slide-in panel from a screen edge.'},
  {name: 'drawer', title: 'Drawer', category: 'Overlay', description: 'Bottom-anchored slide-up sheet.'},
  {name: 'dropdown-menu', title: 'DropdownMenu', category: 'Overlay', description: 'Pop-up menu of actions (items-based API).'},
  {name: 'context-menu', title: 'ContextMenu', category: 'Overlay', description: 'Right-click pop-up menu.'},
  {name: 'command', title: 'Command', category: 'Overlay', description: 'Searchable ⌘K palette with keyboard nav.'},

  // Feedback
  {name: 'toast', title: 'Toast', category: 'Feedback', description: 'Sonner-style toast queue with imperative API.'},

  // Display
  {name: 'badge', title: 'Badge', category: 'Display', description: 'Pill-shaped status / count label.'},
  {name: 'chip', title: 'Chip', category: 'Display', description: 'Toggleable filter pill with optional count.'},
  {name: 'lamp', title: 'Lamp', category: 'Display', description: 'Colored status dot with halo (idle / running / warn / fail).'},
  {name: 'progress-bar', title: 'ProgressBar', category: 'Display', description: 'Determinate or indeterminate progress bar.'},
  {name: 'stat', title: 'Stat', category: 'Display', description: 'Single label + display-font value pair.'},
  {name: 'status-row', title: 'StatusRow', category: 'Display', description: 'Compact summary card for an in-progress operation.'},
  {name: 'progress-ring', title: 'ProgressRing', category: 'Display', description: 'Circular determinate progress with optional centered label.'},
  {name: 'meter', title: 'Meter', category: 'Display', description: 'Discrete level indicator (battery / signal / score).'},
  {name: 'sparkline', title: 'Sparkline', category: 'Display', description: 'Inline mini line chart with optional area fill.'},

  // Data
  {name: 'table', title: 'Table', category: 'Data', description: 'Data-driven HTML table with sortable columns.'},
  {name: 'list', title: 'List', category: 'Data', description: 'Vertical row list with label / description.'},
  {name: 'virtual-list', title: 'VirtualList', category: 'Data', description: 'Windowed list for large datasets (fixed height).'},
  {name: 'infinite-scroll', title: 'InfiniteScroll', category: 'Data', description: 'IntersectionObserver load-more sentinel.'},
  {name: 'timeline', title: 'Timeline', category: 'Data', description: 'Vertical chronological event list with markers.'},

  // Navigation
  {name: 'nav-item', title: 'NavItem', category: 'Navigation', description: 'Sidebar navigation row with dot / label / aside slots.'},
  {name: 'tabs', title: 'Tabs', category: 'Navigation', description: 'Pill-style tab strip (vertical / horizontal) with optional counts.'},
  {name: 'segmented-control', title: 'SegmentedControl', category: 'Navigation', description: 'Connected radio buttons sharing one rounded chassis.'},
  {name: 'breadcrumb', title: 'Breadcrumb', category: 'Navigation', description: 'Hierarchical navigation trail.'},

  // macOS
  {name: 'notch', title: 'Notch', category: 'macOS', description: 'Frosted-material section header with leading / trailing slots.'},
  {name: 'stepper', title: 'Stepper', category: 'macOS', description: '▲▼ connected button pair for increment / decrement.'},
  {name: 'traffic-lights', title: 'TrafficLights', category: 'macOS', description: 'Window controls (close / min / zoom).'},
  {name: 'title-bar', title: 'TitleBar', category: 'macOS', description: 'Drag region with centered title for app windows.'},
  {name: 'inspector', title: 'Inspector', category: 'macOS', description: 'Right-side property panel with sectioned rows.'},
  {name: 'source-list', title: 'SourceList', category: 'macOS', description: 'Finder-style sidebar list with icons + counts.'},
  {name: 'outline-view', title: 'OutlineView', category: 'macOS', description: 'Disclosure tree with chevron toggles.'},
];

export const categories: ComponentCategory[] = [
  'Foundation',
  'Layout',
  'Shell',
  'Display',
  'Form',
  'Overlay',
  'Feedback',
  'Navigation',
  'Data',
  'macOS',
];

export function findComponent(name: string): ComponentMeta | undefined {
  return components.find((c) => c.name === name);
}
