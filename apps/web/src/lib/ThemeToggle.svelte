<!--
ThemeToggle — cycle button for light / dark / auto theming.

`auto` means no `data-theme` override on <html> — `prefers-color-scheme`
in tokens.css decides. `light` / `dark` set the attribute explicitly
and persist to localStorage. A pre-paint script in `app.html` reads
the stored value on first load to avoid a theme flash.
-->
<script lang="ts">
  import {onMount} from 'svelte';

  type Theme = 'light' | 'dark' | 'auto';
  const STORAGE_KEY = 'uin-theme';

  let theme = $state<Theme>('auto');

  function apply(t: Theme) {
    if (typeof document === 'undefined') return;
    if (t === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
    try {
      if (t === 'auto') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore — localStorage may be blocked */
    }
  }

  function cycle() {
    const next: Theme =
      theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto';
    theme = next;
    apply(next);
  }

  onMount(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') theme = stored;
    } catch {
      /* ignore */
    }
  });

  const label = $derived(
    theme === 'light' ? 'Light theme' : theme === 'dark' ? 'Dark theme' : 'Auto theme'
  );
  const next = $derived(
    theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto'
  );
</script>

<button
  class="tt"
  type="button"
  onclick={cycle}
  aria-label="Theme: {label}. Click for {next}."
  title={label}
  data-theme-state={theme}
>
  {#if theme === 'light'}
    <!-- Sun -->
    <svg viewBox="0 0 18 18" width="15" height="15" aria-hidden="true">
      <circle cx="9" cy="9" r="3.4" fill="currentColor" />
      <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <line x1="9" y1="1.4" x2="9" y2="3.2" />
        <line x1="9" y1="14.8" x2="9" y2="16.6" />
        <line x1="1.4" y1="9" x2="3.2" y2="9" />
        <line x1="14.8" y1="9" x2="16.6" y2="9" />
        <line x1="3.5" y1="3.5" x2="4.7" y2="4.7" />
        <line x1="13.3" y1="13.3" x2="14.5" y2="14.5" />
        <line x1="3.5" y1="14.5" x2="4.7" y2="13.3" />
        <line x1="13.3" y1="4.7" x2="14.5" y2="3.5" />
      </g>
    </svg>
  {:else if theme === 'dark'}
    <!-- Moon -->
    <svg viewBox="0 0 18 18" width="15" height="15" aria-hidden="true">
      <path
        d="M14.4 11.2A6 6 0 0 1 6.8 3.6a6 6 0 1 0 7.6 7.6Z"
        fill="currentColor"
      />
    </svg>
  {:else}
    <!-- Monitor / auto -->
    <svg viewBox="0 0 18 18" width="15" height="15" aria-hidden="true">
      <rect x="2" y="3" width="14" height="9.5" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.4" />
      <line x1="6.5" y1="15.5" x2="11.5" y2="15.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      <line x1="9" y1="12.5" x2="9" y2="15.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>
  {/if}
</button>

<style>
  .tt {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 0;
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    background: var(--uin-mat-row);
    color: var(--uin-fg-mute);
    cursor: pointer;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard),
      transform var(--uin-dur-1) var(--uin-ease-standard);
  }
  .tt:hover {
    background: var(--uin-mat-hover);
    color: var(--uin-fg);
    border-color: var(--uin-line-strong);
  }
  .tt:focus-visible {
    outline: none;
    border-color: var(--uin-accent);
    box-shadow: var(--uin-focus-ring);
  }
  .tt:active {
    transform: scale(0.94);
  }

  /* Sun + moon glyphs animate in when their state activates */
  .tt svg {
    animation: tt-pop var(--uin-dur-2) var(--uin-ease-standard) both;
  }
  @keyframes tt-pop {
    from { opacity: 0; transform: scale(0.7) rotate(-12deg); }
    to   { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .tt svg { animation: none; }
    .tt:active { transform: none; }
  }
</style>
