# @a3tai/mittsu — Build Plan

`ROADMAP.md` is the catalog. **This file is the order of attack.**

It groups the ~60 🟡 next-batch components into eight waves, with 🍎 macOS
extras folded into whichever wave pairs with them naturally. Each wave's
prerequisites are the previous waves; within a wave, components are
independent and parallelizable.

If you're picking up the next thing to build, start from the top of the
earliest wave that still has 🟡 items.

## Status (2026-05)

| Wave | Components | Status |
| --- | --- | --- |
| 1 — Layout grammar | 17 | ✅ shipped |
| 2 — Self-contained form controls | 10 | ✅ shipped |
| 3 — Bits UI integration milestone | 7 | ✅ shipped |
| 4 — Menus & selectors | 7 | ✅ shipped |
| 5 — App shell, data & native chrome | 25 | ✅ shipped |
| 6 — Content, feedback & marketing | 23 | ⬜ next |
| 7 — Power-user navigation | 4 | ⬜ later |
| 8 — AI-native flagship | 10 | ⬜ capstone |

**Registry total: 81 ✅ shipped** (cleared via filesystem scan + Playwright
audit). The 🟡 batch in `ROADMAP.md` is reduced to ~37 items spread across
Waves 6–8, plus a few stragglers (RangeCalendar, additional macOS chrome
not in the original 🟡 set).

### Architecture decisions made in flight

- **bits-ui is the headless base**, integrated in Wave 3. Every overlay,
  menu, select, calendar, combobox, accordion, collapsible composes
  bits-ui primitives + our chrome.
- **`vite.config.ts` `ssr.noExternal: ['bits-ui']`** — bits-ui ships
  `.svelte` files that Node's ESM loader can't import directly during SSR.
  Vite must bundle it.
- **Trigger-snippet props pattern** — Popover, Tooltip, DropdownMenu
  expose their trigger as `Snippet<[TriggerProps]>`. The consumer spreads
  the props onto their own button so we never get `<button><button>`. Use
  `bits-ui` v2's `child` snippet on `Trigger` to forward props.
- **`@internationalized/date`** is a soft peer dep for Calendar.
- **Toast queue lives in `toast.svelte.ts`** with module-scope `$state`.
  Mount `<Toaster />` once; call `toast()` imperatively from anywhere.
- **VirtualList is fixed-height only** — variable-height virtualisation is
  a future iteration.
- **Resizable + SplitView use raw PointerEvents** instead of paneforge —
  saves a dep, ~80 lines of pointer math.

### Demo site (apps/web) was extended in flight

Not in the original PLAN but shipped because it kept showing up:

- 81 doc pages at `/components/<name>` (was a 660-line kitchen sink)
- Sidebar nav with category hierarchy, accent rail on active route
- ⌘K command palette, indexes 81 components
- Light/dark/auto theme toggle in topnav, persists to localStorage,
  pre-paint script in `app.html` avoids flash of wrong theme
- Centered search bar in the topnav header
- Page-load fade-up + section stagger on doc pages
- Wider canvas (1100 → 1280px main width)
- Hero stripped from 7 stacked elements to 4

---

## Wave 1 — Layout grammar (✅ shipped)

Zero deps. Unblocks every later wave.

- **Layout primitives**: `Container`, `Stack`, `HStack`, `VStack`, `Flex`,
  `Spacer`, `Center`, `Box`, `Section`
- **Foundation polish**: `Field` (Label + Input + Description + Error),
  `Skeleton`, `AspectRatio`, `ScrollArea`, `Empty`, `Typography`, `Avatar`
- **🍎 Notch** — frosted material section header, pairs with Typography/Section

**Why first:** the entire 🟡 batch leans on layout. `Field` in particular
cleans up every form component in Wave 2.

## Wave 2 — Self-contained form controls (✅ shipped)

State + ARIA, no portals or floating UI. Parallelizable.

- `Toggle`, `ToggleGroup`, `Switch`, `Checkbox`, `RadioGroup`, `Slider`
- `NumberInput`, `PinInput / OTP`, `PasswordInput`
- **🍎 Stepper** — ▲▼ macOS counter, natural pair with `NumberInput`

**Why now:** cheap wins, no infra debate, doubles the form story before we
touch portals.

## Wave 3 — Bits UI integration milestone (✅ shipped)

One-time wiring of [`bits-ui`](https://bits-ui.com/) as the headless base,
then a tight set of overlays that prove the pattern. After this wave every
overlay/menu/select/calendar gets cheaper.

- `Dialog`, `AlertDialog`, `Popover`, `Tooltip`
- `Sheet` 🍎, `Drawer` (Vaul-style)
- `Toast / Sonner`

**Why now:** concentrates portal / focus-trap / floating-UI plumbing into
one wave so later waves don't re-invent it. Adds `bits-ui` to
`package.json` and `registry.json` dependencies.

## Wave 4 — Menus & selectors (✅ shipped)

Depend on Wave 3's `Popover`.

- `DropdownMenu`, `ContextMenu`, `Command` (⌘K palette)
- `Select`, `NativeSelect`, `Combobox`
- `Breadcrumb` (no dep — rides along, nav-adjacent)

**Why now:** unlocks the navigation chrome in Wave 5 and the Spotlight
palette in Wave 7.

## Wave 5 — App shell, data & native chrome (✅ shipped)

The "build a real desktop app" milestone. Composes Waves 1–4 and folds in
the rest of the macOS extras.

**Shell & layout**

- `Sidebar`, `Toolbar` 🍎, `AppShell`,
  `PageHeader / PageBody / PageFooter`
- `Resizable`, `SplitView` 🍎, `Collapsible`, `Accordion`, `DragHandle`
- **🍎 TrafficLights**, **🍎 TitleBar** — Tauri/Wails window chrome
- **🍎 Inspector** — right-side property panel pairs with Sidebar
- **🍎 SourceList** — sidebar list with icon / label / count
- **🍎 OutlineView** (TreeView) — disclosure-tree, depends on `Collapsible`

**Data**

- `Table`, `List`, `VirtualList`, `InfiniteScroll`
- `Timeline`, `Sparkline`, `ProgressRing`, `Meter`
- `Calendar` (bits-ui)

**Why now:** this is the "you could ship a local-first desktop app with this lib"
milestone and the natural home for the macOS chrome that doesn't fit
elsewhere.

## Wave 6 — Content, feedback & marketing (⬜ next)

Mostly visual, no upstream deps past Wave 1. Parallelize alongside Waves
4–5.

- **Feedback**: `Alert`, `Callout`, `Banner`, `Indicator`, `Popconfirm`,
  `EmptyState (illustrated)`
- **Code & typography**: `Code`, `CodeBlock`, `Snippet`, `HotkeyDisplay`,
  `Time / RelativeTime`, `Number`
- **Marketing**: `Hero`, `FeatureGrid`, `CTASection`, `PriceTable`
- **Auth**: `AuthCard`, `OAuthButton`
- **Form wrappers**: `Form`, `FormField`, `FieldError / FieldHint`,
  `PasswordStrength`
- **Media**: `Image` (skeleton + fallback wrapper)

**Why now:** none of these gate the app-shell story. They make the
showcase site (`apps/web`) presentable.

## Wave 7 — Power-user navigation (⬜ later)

- `Spotlight` 🍎 — fullscreen ⌘ Space palette, depends on `Command`
- `TableOfContents`, `Wizard / Steps`, `ButtonGroup`

**Why now:** Spotlight can't ship before Command. The other three compose
Wave 1 + 5 layout primitives.

## Wave 8 — AI-native flagship (⬜ capstone)

The differentiator. Held until last so it composes Avatar, Tooltip,
DropdownMenu, CodeBlock, DiffView text primitives etc. without rework.

- `PromptInput`, `ChatMessage`, `ChatStream`, `TypingDots`
- `ToolCallCard`, `ToolResultCard`, `AgentTimeline`
- `CitationLink`, `DiffView`, `AIBadge`

**Why last:** maximum reuse, cleanest demo, the story is "the rest of the
lib already exists."

---

## Cross-cutting principles

1. **One PR per component** unless two are tightly coupled (e.g.
   `ToggleGroup` lands with `Toggle`). Scaffold via the `add-component`
   Claude skill referenced in `README.md`.
2. **Wave gates are soft.** Start a later wave's component early if it has
   no upstream dep — but don't ship a wave's flagship (e.g. `AppShell`)
   before its prerequisites.
3. **🍎 macOS extras land in their pairing wave**, not as a separate
   track. The placements above are intentional.
4. **Update `ROADMAP.md` in the same PR** that ships the component
   (🟡 → ✅), so the catalog stays accurate.
5. **AI-native is intentionally last.** Do not start Wave 8 components
   opportunistically — they're the capstone demo.

## Coverage map

Every 🟡 item in `ROADMAP.md` appears in exactly one wave:

| Wave | Roadmap rows |
| --- | --- |
| 1 | Container · Stack · HStack/VStack · Flex · Spacer · Center · Box · Section · Field · Skeleton · AspectRatio · ScrollArea · Empty · Typography · Avatar · Notch 🍎 |
| 2 | Toggle · ToggleGroup · Switch · Checkbox · RadioGroup · Slider · NumberInput · PinInput/OTP · PasswordInput · Stepper 🍎 |
| 3 | Dialog · AlertDialog · Popover · Tooltip · Sheet 🍎 · Drawer · Toast/Sonner |
| 4 | DropdownMenu · ContextMenu · Command · Select · NativeSelect · Combobox · Breadcrumb |
| 5 | Sidebar · Toolbar 🍎 · AppShell · PageHeader/Body/Footer · Resizable · SplitView 🍎 · Collapsible · Accordion · DragHandle · TrafficLights 🍎 · TitleBar 🍎 · Inspector 🍎 · SourceList 🍎 · OutlineView 🍎 · Table · List · VirtualList · InfiniteScroll · Timeline · Sparkline · ProgressRing · Meter · Calendar |
| 6 | Alert · Callout · Banner · Indicator · Popconfirm · EmptyState · Code · CodeBlock · Snippet · HotkeyDisplay · Time/RelativeTime · Number · Hero · FeatureGrid · CTASection · PriceTable · AuthCard · OAuthButton · Form · FormField · FieldError/FieldHint · PasswordStrength · Image |
| 7 | Spotlight 🍎 · TableOfContents · Wizard/Steps · ButtonGroup |
| 8 | PromptInput · ChatMessage · ChatStream · TypingDots · ToolCallCard · ToolResultCard · AgentTimeline · CitationLink · DiffView · AIBadge |

⚪ items remain in `ROADMAP.md` and will be re-sequenced once the 🟡 batch
is shipped.
