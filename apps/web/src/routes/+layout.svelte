<script lang="ts">
  import '../app.css';
  import {page} from '$app/stores';
  import type {Snippet} from 'svelte';
  import CommandPalette from '$lib/CommandPalette.svelte';
  import ThemeToggle from '$lib/ThemeToggle.svelte';
  import Toaster from '@a3tai/mittsu-svelte5/components/toast/toaster.svelte';

  type Props = {children: Snippet};
  let {children}: Props = $props();

  const nav = [
    {href: '/', label: 'Home'},
    {href: '/components', label: 'Components'},
    {href: '/charts', label: 'Charts'},
    {href: '/docs', label: 'Docs'},
  ];

  // Best-effort macOS detection for the kbd hint glyph
  const isMac =
    typeof navigator !== 'undefined' &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const cmdGlyph = isMac ? '⌘' : 'Ctrl';

  function openPalette() {
    // Synthesise the same keyboard event the palette listens for
    window.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'k', metaKey: isMac, ctrlKey: !isMac})
    );
  }
</script>

<div class="shell">
  <header class="topnav">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true" lang="ja">三つ</span>
      <span class="brand-name">Mittsu</span>
    </a>
    <button class="topnav-cmdk" type="button" onclick={openPalette} aria-label="Open command palette">
      <svg class="topnav-cmdk-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
        <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <span class="topnav-cmdk-label">Find a component…</span>
      <kbd>{cmdGlyph} K</kbd>
    </button>

    <nav class="topnav-links">
      {#each nav as item}
        <a
          href={item.href}
          class="topnav-link"
          class:active={$page.url.pathname === item.href || (item.href !== '/' && $page.url.pathname.startsWith(item.href))}
        >
          {item.label}
        </a>
      {/each}
      <ThemeToggle />
      <a class="topnav-link gh" href="https://github.com/a3tai/mittsu" target="_blank" rel="noreferrer">GitHub ↗</a>
    </nav>
  </header>

  <CommandPalette />
  <Toaster position="bottom-right" />

  <main class="main">
    {@render children()}
  </main>

  <footer class="foot">
    <span>© 2026 A3T. MIT.</span>
    <a class="foot-chip" href="https://a3t.ai" target="_blank" rel="noreferrer">Sponsored by A3T</a>
  </footer>
</div>

<style>
  .shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .topnav {
    position: sticky;
    top: 0;
    z-index: 10;
    height: 56px;
    display: grid;
    grid-template-columns: 1fr minmax(260px, 440px) 1fr;
    align-items: center;
    gap: var(--uin-s-4);
    padding: 0 var(--uin-s-6);
    background: color-mix(in srgb, var(--uin-bg-base) 86%, transparent);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border-bottom: 1px solid var(--uin-line);
  }
  .topnav > .brand { justify-self: start; }
  .topnav > .topnav-cmdk { justify-self: stretch; }
  .topnav > .topnav-links { justify-self: end; }
  /* ── Brand wordmark ────────────────────────────────────
     Two-part type lockup: the Japanese mark "三つ" leads in the
     accent, paired with a display-font "Mittsu" wordmark. No chip,
     no box — the type carries the identity. */
  .brand {
    display: inline-flex;
    align-items: baseline;
    gap: 9px;
    color: var(--uin-fg);
    text-decoration: none;
    /* Subtle hover: kanji deepens; wordmark slides a touch */
    transition: opacity var(--uin-dur-1) var(--uin-ease-standard);
  }
  .brand:hover { opacity: 0.86; }
  .brand:focus-visible {
    outline: none;
    box-shadow: var(--uin-focus-ring);
    border-radius: var(--uin-r-sm);
  }

  .brand-mark {
    /* CJK stack — Hiragino on macOS is the cleanest at small sizes;
       Yu Gothic on Windows; Noto on Linux/web; system-ui as final
       fallback. */
    font-family:
      'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic',
      'Noto Sans CJK JP', 'Noto Sans JP', system-ui, sans-serif;
    font-weight: 500;
    font-size: 22px;
    line-height: 1;
    letter-spacing: -0.04em;
    color: var(--uin-accent);
    /* Sit on the latin baseline rather than its own descender so 三つ
       and "Mittsu" feel like one type lockup. */
    position: relative;
    top: 1px;
  }

  .brand-name {
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.018em;
    line-height: 1;
    color: var(--uin-fg);
  }

  .topnav-links {
    display: flex;
    align-items: center;
    gap: var(--uin-s-1);
  }
  .topnav-link {
    color: var(--uin-fg-mute);
    padding: 6px var(--uin-s-3);
    border-radius: var(--uin-r-sm);
    font-size: 12.5px;
    text-decoration: none;
    transition: background-color var(--uin-dur-1) var(--uin-ease-standard), color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .topnav-link:hover { background: var(--uin-mat-hover); color: var(--uin-fg); }
  .topnav-link.active { color: var(--uin-fg); background: var(--uin-mat-selected); }
  .topnav-link.gh { color: var(--uin-fg-dim); }

  .topnav-cmdk {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    width: 100%;
    height: 30px;
    padding: 0 8px 0 12px;
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    background: var(--uin-mat-row);
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    font-family: var(--uin-font-ui);
    cursor: pointer;
    text-align: left;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .topnav-cmdk:hover {
    background: var(--uin-mat-hover);
    color: var(--uin-fg);
    border-color: var(--uin-line-strong);
  }
  .topnav-cmdk:focus-visible {
    outline: none;
    border-color: var(--uin-accent);
    box-shadow: var(--uin-focus-ring);
  }
  .topnav-cmdk:active {
    transform: scale(0.985);
  }
  .topnav-cmdk-icon {
    flex-shrink: 0;
    color: var(--uin-fg-mute);
  }
  .topnav-cmdk-label {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .topnav-cmdk kbd {
    flex-shrink: 0;
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    padding: 1px 5px;
    border: 1px solid var(--uin-line);
    border-radius: 4px;
    color: var(--uin-fg-mute);
    background: var(--uin-mat-panel);
  }

  @media (max-width: 760px) {
    .topnav {
      grid-template-columns: auto 1fr auto;
    }
    .topnav-cmdk-label { display: none; }
  }
  @media (max-width: 540px) {
    .brand-name { display: none; }
  }

  .main {
    flex: 1;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--uin-s-7) var(--uin-s-6) var(--uin-s-8);
  }

  .foot {
    border-top: 1px solid var(--uin-line);
    padding: var(--uin-s-4) var(--uin-s-6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--uin-fg-dim);
    font-size: 11.5px;
  }
  .foot-chip {
    font-style: italic;
    color: var(--uin-fg-mute);
    text-decoration: none;
  }
</style>
