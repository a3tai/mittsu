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
    <div class="topnav-inner">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true" lang="ja">三つ</span>
        <span class="brand-name">Mittsu</span>
      </a>

      <nav class="topnav-links" aria-label="Primary">
        {#each nav as item}
          <a
            href={item.href}
            class="topnav-link"
            class:active={$page.url.pathname === item.href || (item.href !== '/' && $page.url.pathname.startsWith(item.href))}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="topnav-actions">
        <button class="topnav-cmdk" type="button" onclick={openPalette} aria-label="Open command palette">
          <svg class="topnav-cmdk-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
            <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <span class="topnav-cmdk-label">Search</span>
          <kbd>{cmdGlyph} K</kbd>
        </button>
        <ThemeToggle />
        <a class="topnav-github" href="https://github.com/a3tai/mittsu" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  </header>

  <CommandPalette />
  <Toaster position="bottom-right" />

  <main class="main">
    {@render children()}
  </main>

  <footer class="foot">
    <div class="foot-inner">
      <div class="foot-brand">
        <span class="brand-mark foot-mark" aria-hidden="true" lang="ja">三つ</span>
        <span>
          <span class="foot-name">Mittsu</span>
          <span class="foot-note">Source-first UI primitives for Svelte product work.</span>
        </span>
      </div>
      <nav class="foot-links" aria-label="Footer">
        <a href="/components">Components</a>
        <a href="/charts">Charts</a>
        <a href="/docs">Docs</a>
        <a href="https://a3t.ai" target="_blank" rel="noreferrer">A3T</a>
      </nav>
      <span class="foot-copy">© 2026 A3T. MIT.</span>
    </div>
  </footer>
</div>

<style>
  .shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--uin-mat-window);
  }
  .topnav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: color-mix(in srgb, var(--uin-mat-window) 86%, transparent);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--uin-line);
  }
  .topnav-inner {
    width: min(100% - 32px, 1180px);
    min-height: 58px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--uin-s-4);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-3);
    color: var(--uin-fg);
    text-decoration: none;
    transition: opacity var(--uin-dur-1) var(--uin-ease-standard);
  }
  .brand,
  .topnav-link,
  .topnav-github,
  .foot a {
    text-decoration: none;
  }
  .brand:hover { opacity: 0.86; }
  .brand:focus-visible {
    outline: none;
    box-shadow: var(--uin-focus-ring);
    border-radius: var(--uin-r-sm);
  }
  .brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
    color: var(--uin-fg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family:
      'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic',
      'Noto Sans CJK JP', 'Noto Sans JP', system-ui, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.06em;
  }
  .brand-name {
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 17px;
    letter-spacing: -0.018em;
    line-height: 1;
    color: var(--uin-fg);
  }

  .topnav-links {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-4);
  }
  .topnav-link {
    color: var(--uin-fg-mute);
    font-size: 13px;
    text-decoration: none;
    transition: color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .topnav-link:hover { color: var(--uin-fg); }
  .topnav-link.active { color: var(--uin-fg); }

  .topnav-actions {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--uin-s-2);
    min-width: 0;
  }

  .topnav-cmdk {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    height: 32px;
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
  .topnav-github {
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 0 var(--uin-s-3);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-sm);
    color: var(--uin-fg);
    background: var(--uin-mat-window);
    font-size: 12.5px;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .topnav-github:hover {
    background: var(--uin-mat-hover);
    border-color: var(--uin-line-strong);
  }

  .main {
    flex: 1;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: var(--uin-s-7) var(--uin-s-5) var(--uin-s-8);
  }

  .foot {
    border-top: 1px solid var(--uin-line);
    background: var(--uin-mat-sidebar);
  }
  .foot-inner {
    width: min(100% - 32px, 1180px);
    margin: 0 auto;
    padding: var(--uin-s-6) 0 var(--uin-s-4);
    display: grid;
    grid-template-columns: 1.4fr auto auto;
    gap: var(--uin-s-5);
    align-items: center;
    color: var(--uin-fg-dim);
    font-size: 11.5px;
  }
  .foot-brand {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    min-width: 0;
  }
  .foot-mark {
    width: 28px;
    height: 28px;
    font-size: 13px;
    flex: 0 0 auto;
  }
  .foot-name {
    display: block;
    font-family: var(--uin-font-display);
    font-size: 14px;
    color: var(--uin-fg);
    letter-spacing: -0.014em;
  }
  .foot-note {
    display: block;
    color: var(--uin-fg-mute);
  }
  .foot-links {
    display: inline-flex;
    gap: var(--uin-s-4);
  }
  .foot-links a {
    color: var(--uin-fg-mute);
    text-decoration: none;
    transition: color var(--uin-dur-1);
  }
  .foot-links a:hover {
    color: var(--uin-fg);
  }
  .foot-copy {
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    .topnav-inner {
      grid-template-columns: 1fr auto;
    }
    .topnav-links {
      display: none;
    }
    .foot-inner {
      grid-template-columns: 1fr;
      align-items: start;
    }
    .foot-links {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 560px) {
    .topnav-inner {
      width: min(100% - 24px, 1180px);
      gap: var(--uin-s-2);
    }
    .brand-name,
    .topnav-cmdk-label,
    .topnav-github {
      display: none;
    }
    .main {
      padding: var(--uin-s-6) var(--uin-s-3) var(--uin-s-7);
    }
  }
</style>
