<script lang="ts">
  import {page} from '$app/stores';
  import {charts, chartCategories} from '$lib/docs';
  import type {Snippet} from 'svelte';

  type Props = {children: Snippet};
  let {children}: Props = $props();

  const currentName = $derived(
    $page.url.pathname.replace(/^\/charts\/?/, '').split('/')[0] ?? ''
  );
</script>

<div class="cn-layout">
  <aside class="cn-side" aria-label="Charts navigation">
    <a class="cn-side-home" href="/charts" class:active={!currentName}>
      <span class="cn-side-home-icon" aria-hidden="true">◌</span>
      <span>All charts</span>
      <span class="cn-side-home-count">{charts.length}</span>
    </a>
    {#each chartCategories as cat}
      {@const items = charts.filter((chart) => chart.category === cat)}
      {#if items.length}
        <section class="cn-side-section">
          <p class="cn-side-cat">{cat}</p>
          <ul class="cn-side-list">
            {#each items as chart (chart.name)}
              <li>
                <a href="/charts/{chart.name}" class:active={currentName === chart.name}>
                  {chart.title}
                </a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    {/each}
  </aside>
  <main class="cn-content">
    {@render children()}
  </main>
</div>

<style>
  .cn-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: var(--uin-s-6);
    align-items: flex-start;
  }
  .cn-side {
    position: sticky;
    top: calc(56px + var(--uin-s-5));
    max-height: calc(100vh - 56px - var(--uin-s-6));
    overflow-y: auto;
    padding-right: var(--uin-s-2);
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--uin-fg) 18%, transparent) transparent;
  }
  .cn-side::-webkit-scrollbar { width: 8px; }
  .cn-side::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 999px;
    background-color: color-mix(in srgb, var(--uin-fg) 18%, transparent);
  }

  .cn-side-home {
    display: flex;
    align-items: center;
    gap: var(--uin-s-2);
    padding: 6px var(--uin-s-2);
    margin-bottom: var(--uin-s-3);
    color: var(--uin-fg);
    text-decoration: none;
    font-size: 12.5px;
    font-weight: 500;
    border-radius: var(--uin-r-sm);
    transition: background-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .cn-side-home:hover { background: var(--uin-mat-hover); }
  .cn-side-home.active { background: var(--uin-mat-selected); color: var(--uin-fg); }
  .cn-side-home-icon { color: var(--uin-fg-mute); font-size: 14px; }
  .cn-side-home-count {
    margin-left: auto;
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    color: var(--uin-fg-dim);
  }

  .cn-side-section {
    margin-bottom: var(--uin-s-3);
  }
  .cn-side-cat {
    margin: 0 0 4px;
    padding: 0 var(--uin-s-2);
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
    font-weight: 500;
  }
  .cn-side-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .cn-side-list li { margin: 0; }
  .cn-side-list a {
    display: block;
    padding: 4px var(--uin-s-2);
    border-radius: var(--uin-r-sm);
    font-size: 12.5px;
    color: var(--uin-fg-mute);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .cn-side-list a:hover { background: var(--uin-mat-hover); color: var(--uin-fg); }
  .cn-side-list a.active {
    background: var(--uin-mat-selected);
    color: var(--uin-fg);
    font-weight: 500;
  }

  .cn-content {
    min-width: 0;
  }

  :global(.chart-doc-preview) {
    width: min(100%, 760px);
  }

  :global(.chart-doc-preview .uin-chart-frame) {
    width: 100%;
  }

  :global(.chart-doc-preview-wide) {
    width: min(100%, 920px);
  }

  :global(.chart-tooltip-preview) {
    position: relative;
    min-width: 240px;
    min-height: 96px;
  }

  :global(.chart-tooltip-preview .uin-chart-tooltip) {
    position: static;
    transform: none;
  }

  @media (max-width: 760px) {
    .cn-layout {
      grid-template-columns: 1fr;
    }
    .cn-side {
      position: static;
      max-height: none;
      margin-bottom: var(--uin-s-5);
      padding-right: 0;
    }
  }
</style>
