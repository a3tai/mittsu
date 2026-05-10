# @a3tai/mittsu — Component Roadmap

A union of what shadcn/ui, Radix, Bits UI, Mantine, Park UI, Apple's
HIG (macOS/iOS), and Material 3 Expressive ship in 2026, organized by
category. Items are tagged with their status:

- ✅ shipped (in `packages/svelte5/components/`)
- 🟡 next (queued for the next batch)
- ⚪ later (in scope, not started)
- 🍎 macOS-flavored variant we want even if shadcn doesn't have one
- 📱 iOS/touch-flavored variant for the mobile-first packages later

Cross-references show which library has the closest analogue. Where
multiple list it, the one we use as our reference implementation
appears first.

## Foundation

| Component | Status | Reference |
| --- | --- | --- |
| Button | ✅ | shadcn / Radix Toolbar.Button / HIG Button |
| ButtonGroup | 🟡 | shadcn ButtonGroup, M3 button groups |
| IconButton | ✅ (Button `icon` prop) | HIG Toolbar Button |
| Input | ✅ | shadcn Input / HIG Text Field |
| Textarea | ✅ | shadcn Textarea |
| Label | ✅ | shadcn Label / Radix Label |
| Field | ✅ | shadcn Field — wraps Label + Input + Description + Error |
| Kbd | ✅ | shadcn Kbd |
| Spinner | ✅ | shadcn Spinner |
| Skeleton | ✅ | shadcn Skeleton, M3 loading indicators |
| Separator | ✅ | shadcn / Radix Separator |
| Card | ✅ | shadcn Card |
| AspectRatio | ✅ | Radix AspectRatio |
| ScrollArea | ✅ | Radix ScrollArea — custom scrollbar chrome |
| Container | ✅ | layout primitive (max-width + auto margin) |
| Stack | ✅ | flex column with gap-token spacing |
| Grid | ⚪ | named-area helper |
| Empty | ✅ | shadcn Empty — empty-state placeholder |
| Typography | ✅ | shadcn Typography — H1/H2/.../P presets |

## Display

| Component | Status | Reference |
| --- | --- | --- |
| Badge | ✅ | shadcn Badge |
| Chip | ✅ | filter pill (Park UI Tag, M3 Filter Chip) |
| Lamp | ✅ 🍎 | original — status indicator dot |
| ProgressBar | ✅ | shadcn Progress / Radix Progress |
| Meter | ✅ | Bits UI Meter — discrete level (vs continuous progress) |
| Stat | ✅ | original — label/value primitive |
| StatusRow | ✅ 🍎 | original — sidebar status card |
| Avatar | ✅ | shadcn Avatar / Radix Avatar |
| AvatarGroup | ⚪ | Mantine AvatarGroup |
| Toast / Sonner | ✅ | shadcn Sonner |
| Tooltip | ✅ | Radix Tooltip |
| HoverCard | ⚪ | Radix HoverCard |
| Indicator | ⚪ | small dot/count overlay (Mantine Indicator) |

## Navigation

| Component | Status | Reference |
| --- | --- | --- |
| NavItem | ✅ 🍎 | original — sidebar row |
| Tabs | ✅ | shadcn / Radix Tabs |
| Breadcrumb | ✅ | shadcn Breadcrumb |
| Pagination | ⚪ | shadcn / Bits UI Pagination |
| NavigationMenu | ⚪ | Radix NavigationMenu — mega-menu |
| Menubar | ⚪ 🍎 | Radix Menubar — macOS top-of-window strip |
| Sidebar | ✅ | shadcn Sidebar — collapsible sidebar shell |
| Toolbar | ✅ 🍎 | Radix Toolbar / HIG Toolbar |
| TrafficLights | ✅ 🍎 | original — macOS close/min/max controls |
| TitleBar | ✅ 🍎 | original — drag region + window-title chrome |
| Steps / Stepper | ⚪ | Mantine Stepper |

## Actions

| Component | Status | Reference |
| --- | --- | --- |
| SegmentedControl | ✅ 🍎 | HIG Segmented Control / Mantine SegmentedControl |
| Toggle | ✅ | Radix Toggle / shadcn Toggle |
| ToggleGroup | ✅ | Radix ToggleGroup |
| Switch | ✅ | shadcn / Radix Switch |
| SplitButton | ⚪ | M3 split button, Mantine SplitButton |
| Command | ✅ | shadcn Command — ⌘K palette |
| ContextMenu | ✅ | shadcn / Radix ContextMenu |
| DropdownMenu | ✅ | shadcn / Radix DropdownMenu |
| FloatingActionButton | ⚪ 📱 | M3 FAB |
| ActionSheet | ⚪ 📱 | iOS Action Sheet |

## Form

| Component | Status | Reference |
| --- | --- | --- |
| Checkbox | ✅ | shadcn / Radix Checkbox |
| RadioGroup | ✅ | shadcn / Radix RadioGroup |
| Slider | ✅ | shadcn / Radix Slider |
| RangeSlider | ⚪ | Mantine RangeSlider |
| Select | ✅ | shadcn / Radix Select |
| NativeSelect | ✅ | shadcn NativeSelect |
| Combobox | ✅ | shadcn / Bits UI Combobox |
| MultiSelect | ⚪ | Mantine MultiSelect |
| TagsInput | ⚪ | Bits UI / Park UI TagsInput |
| Autocomplete | ⚪ | Mantine Autocomplete |
| NumberInput | ✅ | shadcn Stepper / Mantine NumberInput |
| PinInput / OTP | ✅ | shadcn InputOTP / Radix OneTimePasswordField |
| PasswordInput | ✅ | Radix PasswordToggleField |
| FilePicker | ⚪ | Mantine FileInput |
| Dropzone | ⚪ | Mantine Dropzone |
| ColorWell | ⚪ 🍎 | HIG Color Well |
| ColorPicker | ⚪ | Mantine ColorPicker |
| DateField | ⚪ | Bits UI DateField |
| DatePicker | ⚪ | Bits UI DatePicker / shadcn DatePicker |
| DateRangePicker | ⚪ | Bits UI DateRangePicker |
| TimeField | ⚪ | Bits UI TimeField |
| Calendar | ✅ | shadcn / Bits UI Calendar |
| RangeCalendar | ⚪ | Bits UI RangeCalendar |
| RatingGroup | ⚪ | Bits UI RatingGroup |
| Form | ⚪ | shadcn Form — wrapper around field validation |

## Overlay

| Component | Status | Reference |
| --- | --- | --- |
| Dialog | ✅ | shadcn / Radix Dialog |
| AlertDialog | ✅ | shadcn / Radix AlertDialog |
| Sheet | ✅ 🍎 | shadcn Sheet / HIG Sheet |
| Drawer | ✅ | shadcn Drawer (Vaul-style) |
| Popover | ✅ | shadcn / Radix Popover |
| Panel | ⚪ 🍎 | HIG Panel — floating utility window |

## Layout / Surfaces

| Component | Status | Reference |
| --- | --- | --- |
| Resizable | ✅ | shadcn Resizable |
| SplitView | ✅ 🍎 | HIG SplitView — multi-pane container |
| Collapsible | ✅ | shadcn / Radix Collapsible |
| Accordion | ✅ | shadcn / Radix Accordion |
| Carousel | ⚪ | shadcn Carousel |

## Data

| Component | Status | Reference |
| --- | --- | --- |
| Table | ✅ | shadcn Table |
| DataTable | ⚪ | shadcn DataTable (TanStack) |
| OutlineView (Tree) | ✅ 🍎 | HIG OutlineView |
| List | ✅ | shadcn Item / virtualized rows |
| Chart | ⚪ | shadcn Chart (Recharts) |

## Media

| Component | Status | Reference |
| --- | --- | --- |
| Image | ⚪ | wrapper with skeleton + fallback |
| Video | ⚪ | wrapper |

## macOS-flavored extras

These are the native desktop elements that don't map cleanly to a web
component library:

- 🍎 TrafficLights — ⨯ ◯ ◻︎ window controls ✅
- 🍎 TitleBar — drag region with centered title ✅
- 🍎 Toolbar — macOS-style toolbar with nodrag children ✅
- 🍎 ColorWell — opens system color picker
- 🍎 SourceList — sidebar list with icon, label, count ✅
- 🍎 OutlineView — disclosure-tree ✅
- 🍎 SegmentedControl — already shipped; mark for the iOS variant later
- 🍎 Stepper — ▲▼ macOS counter ✅
- 🍎 Inspector — right-side property panel ✅
- 🍎 Notch — frosted material section header ✅

## Mobile-flavored extras (📱, future package)

When `packages/svelte5-mobile` (or React Native via Tamagui) lands:

- 📱 FAB — Material 3 floating action button
- 📱 ActionSheet — iOS bottom sheet of buttons
- 📱 PullToRefresh
- 📱 SwipeActions — swipe-to-reveal row actions
- 📱 SegmentedControl (touch sizing)
- 📱 BottomTabBar
- 📱 NavigationBar (iOS large title)

## Layered headless dependencies

For overlay/menu/select/popover/tooltip/calendar/combobox we adopt
[`bits-ui`](https://bits-ui.com/) as the headless base — same role
Radix plays for shadcn. Bits UI is built on Melt UI internals and
fully rebuilt for Svelte 5. Components in those rows compose Bits UI
primitives + our token-driven CSS.

For tables we'll likely adopt
[`@tanstack/table-core`](https://tanstack.com/table) headlessly when
DataTable lands.

## Extended set (additional components considered)

After surveying the canonical libraries, here are categories and items
that *don't* show up in shadcn/Radix's core lists but matter for
real-world 2026 product work. Most are "next" or "later"; a few will
become flagship differentiators.

### Feedback / messaging

| Component | Status | Notes |
| --- | --- | --- |
| Alert | 🟡 | Inline status box (info/warn/success/danger). shadcn has it. |
| Callout | 🟡 | Softer Alert variant, used in docs/marketing. |
| Banner | 🟡 | Top-of-app dismissible strip (announcements, beta tags). |
| Toast | 🟡 | Already in Overlay; restate for completeness. |
| Notice | ⚪ | Quietest of the family, single-line. |
| Notification (bell) | ⚪ | Header notification dropdown with list. |
| Indicator | 🟡 | Small overlay dot/count on icons (Mantine Indicator). |

### Code / typography utilities

| Component | Status | Notes |
| --- | --- | --- |
| Code | 🟡 | Inline `<code>` styling. |
| CodeBlock | 🟡 | Multi-line block with copy button + optional line numbers. |
| Snippet | 🟡 | One-line CLI / terminal sample with copy button. |
| Pre | ⚪ | Plain monospace block. |
| Markdown | ⚪ | Render markdown to elements. |
| Math | ⚪ | KaTeX wrapper. |
| Mermaid | ⚪ | Diagram renderer wrapper. |
| HotkeyDisplay | 🟡 | Composes Kbd: `⌘ K`, `⌘ ⇧ P`. |
| Time / RelativeTime | 🟡 | Auto-updating "5 min ago"; locale-aware. |
| Number | 🟡 | Locale-aware tabular number. |
| NumberFlow | ⚪ | Animated digit transitions (Mantine NumberFormatter+motion). |
| Currency | ⚪ | Currency-formatted Number variant. |
| Trend | ⚪ | Number with up/down arrow + delta %. |

### Form (additional)

| Component | Status | Notes |
| --- | --- | --- |
| Form | 🟡 | shadcn Form — validation wrapper around primitives. |
| FormField | 🟡 | Single field abstraction. |
| FieldError / FieldHint | 🟡 | Error / helper text under a field. |
| PasswordInput | 🟡 | Already listed; pair with PasswordStrength. |
| PasswordStrength | 🟡 | Visual meter under PasswordInput. |
| MentionsInput | ⚪ | @-trigger autocomplete. |
| EmojiPicker | ⚪ | Native-feel emoji grid + search. |
| PhoneInput | ⚪ | International with country flag. |
| TagsInput | ⚪ | Already listed in Form. |
| RichTextEditor | ⚪ | Tiptap wrapper. |
| MarkdownEditor | ⚪ | RichTextEditor preset for markdown. |
| CodeEditor | ⚪ | CodeMirror wrapper. |
| Dropzone | ⚪ | File drop target. |
| SignaturePad | ⚪ | Pen-input drawing. |
| CronInput | ⚪ | Visual cron expression builder. |
| AddressForm | ⚪ | Street/city/postal scaffold. |

### Navigation (additional)

| Component | Status | Notes |
| --- | --- | --- |
| Spotlight | 🟡 🍎 | Mantine Spotlight — fullscreen ⌘ Space palette. |
| TableOfContents | 🟡 | Auto-built from headings; sticky outline. |
| AnchorNav | ⚪ | Section-scrollspy navigation. |
| TabBar | ⚪ 🍎 | Browser-style draggable tab strip. |
| StatusBar | ⚪ 🍎 | Bottom-of-window status text + lamps. |
| MenuItem / MenuGroup / MenuSeparator / MenuLabel | ⚪ | Atoms behind DropdownMenu / Menubar. |
| Wizard / Steps | 🟡 | Multi-step form container. |

### Layout (additional)

| Component | Status | Notes |
| --- | --- | --- |
| HStack / VStack | ✅ | Explicit flex direction with token gap. |
| Flex | ✅ | Generic flex container with token props. |
| Spacer | ✅ | Empty flex spacer. |
| Center | ✅ | Centers children horizontally + vertically. |
| Box | ✅ | Generic with padding/margin/bg props. |
| Section | ✅ | Semantic section with title slot. |
| AppShell | ✅ | Full-window header + sidebar + main scaffold. |
| PageHeader / PageBody / PageFooter | ✅ | Page-level slots. |
| DragHandle | ✅ | Resize/reorder grab indicator. |
| Sticky | ⚪ | Sticky-position helper. |

### Data (additional)

| Component | Status | Notes |
| --- | --- | --- |
| VirtualList | ✅ | Virtualized list for huge datasets. |
| VirtualGrid | ⚪ | Virtualized grid. |
| InfiniteScroll | ✅ | Loads more near scroll edge. |
| TreeView / OutlineView | ✅ 🍎 | Already listed under macOS extras. |
| Kanban | ⚪ | Column-based drag-drop board. |
| Timeline | ✅ | Chronological event list. |
| Schedule | ⚪ | Day/week/month scheduling grid. |
| Gantt | ⚪ | Time-bar scheduling. |
| PivotTable | ⚪ | Cross-tab data exploration. |
| JsonViewer | ⚪ | Collapsible JSON tree. |
| Sparkline | ✅ | Inline mini-chart. |
| ProgressRing | ✅ | Circular determinate progress. |

### Media (additional)

| Component | Status | Notes |
| --- | --- | --- |
| Image | 🟡 | Skeleton + fallback wrapper. |
| Video | ⚪ | Native video chrome. |
| Audio | ⚪ | Audio scrubber + play. |
| AudioWaveform | ⚪ | Visualization of waveform. |
| Lightbox | ⚪ | Click-to-zoom image overlay. |
| ImageCrop | ⚪ | Crop UI. |

### AI-native (2026 differentiator)

| Component | Status | Notes |
| --- | --- | --- |
| PromptInput | 🟡 | Chat-style multiline input + attachments + send. |
| ChatMessage | 🟡 | Role-tinted bubble (user / assistant / tool / system). |
| ChatStream | 🟡 | Streaming-output container with typing dots. |
| TypingDots | 🟡 | Three-dot pulser. |
| ToolCallCard | 🟡 | Display of a tool invocation (name + args). |
| ToolResultCard | 🟡 | Result block beneath ToolCallCard. |
| AgentTimeline | 🟡 | Vertical multi-step agent run trace. |
| CitationLink | 🟡 | Inline `[1]` with hover preview of source. |
| DiffView | 🟡 | Side-by-side / inline diff for AI edits. |
| AIBadge | 🟡 | "AI" label, opt-in shimmer. |
| TokenCounter | ⚪ | Live count + cost estimate near PromptInput. |
| PromptSuggestions | ⚪ | Chip strip of starter prompts. |

### Marketing / landing

| Component | Status | Notes |
| --- | --- | --- |
| Hero | 🟡 | Landing-page hero scaffold. |
| FeatureGrid | 🟡 | Grid of icon + title + body cards. |
| TestimonialCard | ⚪ | Quote + avatar + name. |
| CTASection | 🟡 | Call-to-action section with title + button. |
| LogoCloud | ⚪ | "Trusted by" logo strip. |
| PriceTable | 🟡 | Pricing tier cards. |
| Marquee | ⚪ | Looping horizontal scroll. |
| GradientText | ⚪ | Multi-stop gradient text mask. |
| AnimatedText | ⚪ | Type-out / fade-in text. |
| Confetti | ⚪ | Particle celebration on event. |
| Stat (Marketing variant) | ⚪ | Big-number marketing stat. |

### Collaborative

| Component | Status | Notes |
| --- | --- | --- |
| Cursor | ⚪ | Remote-presence cursor with name. |
| Comment | ⚪ | Single comment bubble. |
| CommentThread | ⚪ | Nested comments. |
| Reaction | ⚪ | Emoji reaction button. |
| Mention | ⚪ | @-mention chip render. |
| Highlight | ⚪ | Text-selection highlight with author. |
| PresenceList | ⚪ | Avatar stack of who's online. |

### Onboarding / discovery

| Component | Status | Notes |
| --- | --- | --- |
| Tour / Coachmark | ⚪ | Spotlight + tooltip walkthrough. |
| Popconfirm | 🟡 | Tiny confirmation popover (Ant Design pattern). |
| EmptyState (illustrated) | 🟡 | Empty + slot for SVG illustration. |
| WhatsNew | ⚪ | Modal listing recent changes. |

### Auth / commerce

| Component | Status | Notes |
| --- | --- | --- |
| AuthCard | 🟡 | Sign-in / sign-up form scaffold. |
| OAuthButton | 🟡 | "Continue with Google/GitHub/Apple" buttons. |
| Captcha | ⚪ | Wrapper for Turnstile / hCaptcha. |
| AddressForm | ⚪ | Already in Form. |
| PaymentForm | ⚪ | Stripe Elements style scaffold. |

### Hardware / native (Tauri / Wails)

| Component | Status | Notes |
| --- | --- | --- |
| TrafficLights | ⚪ 🍎 | Already listed. |
| TitleBar | ⚪ 🍎 | Already listed. |
| Menubar | ⚪ 🍎 | Already listed. |
| StatusBar | ⚪ 🍎 | Already listed. |
| WindowChrome | ⚪ 🍎 | Combination of TitleBar + StatusBar. |
| FrostedSurface | ⚪ 🍎 | Backdrop-filtered material wrapper. |

## Counts

- ✅ shipped: **81**
- 🟡 next batch: **~9**
- ⚪ later: **~80**

Total scoped surface: ~155 components across 14 categories. The 🟡
batch — the next big wave — is everything you'd need to build a
modern desktop or web app without reaching for another library.

## Sources

- [shadcn/ui components](https://ui.shadcn.com/docs/components)
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/components)
- [Bits UI components](https://bits-ui.com/docs/components)
- [Apple HIG components](https://developer.apple.com/design/human-interface-guidelines/components)
- [Material 3 Expressive](https://m3.material.io/blog/building-with-m3-expressive)
- [Mantine](https://mantine.dev/)
- [Park UI](https://park-ui.com/)
- [Tamagui](https://tamagui.dev/)
