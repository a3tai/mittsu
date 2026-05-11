<script lang="ts">
  import {page} from '$app/stores';
  import {components, categories} from '$lib/docs';
  import type {Snippet} from 'svelte';

  type Props = {children: Snippet};
  let {children}: Props = $props();

  const currentName = $derived(
    $page.url.pathname.replace(/^\/components\/?/, '').split('/')[0] ?? ''
  );
</script>

<div class="cn-layout">
  <aside class="cn-side" aria-label="Components navigation">
    <a class="cn-side-home" href="/components" class:active={!currentName}>
      <span class="cn-side-home-icon" aria-hidden="true">◵</span>
      <span>All components</span>
      <span class="cn-side-home-count">{components.length}</span>
    </a>
    {#each categories as cat}
      {@const items = components.filter((c) => c.category === cat)}
      {#if items.length}
        <section class="cn-side-section">
          <p class="cn-side-cat">{cat}</p>
          <ul class="cn-side-list">
            {#each items as c (c.name)}
              <li>
                <a href="/components/{c.name}" class:active={currentName === c.name}>
                  {c.title}
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
    grid-template-columns: 236px 1fr;
    gap: var(--uin-s-6);
    align-items: flex-start;
  }
  .cn-side {
    position: sticky;
    top: calc(58px + var(--uin-s-4));
    max-height: calc(100vh - 58px - var(--uin-s-6));
    overflow-y: auto;
    padding: var(--uin-s-3) var(--uin-s-2);
    background: var(--uin-mat-sidebar);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
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
    padding: 6px 8px;
    margin-bottom: var(--uin-s-3);
    color: var(--uin-fg);
    text-decoration: none;
    font-size: 12.5px;
    font-weight: 500;
    border-radius: var(--uin-r-sm);
    border: 1px solid transparent;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .cn-side-home:hover { background: var(--uin-mat-hover); }
  .cn-side-home.active {
    background: var(--uin-mat-selected);
    border-color: var(--uin-line);
    color: var(--uin-fg);
  }
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
    padding: 0 8px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .cn-side-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .cn-side-list li { margin: 0; }
  .cn-side-list a {
    position: relative;
    display: block;
    padding: 4px 8px;
    border-radius: var(--uin-r-sm);
    font-size: 12.5px;
    color: var(--uin-fg-mute);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .cn-side-list a:hover {
    background: var(--uin-mat-hover);
    color: var(--uin-fg);
  }
  .cn-side-list a.active {
    background: var(--uin-mat-selected);
    color: var(--uin-fg);
    font-weight: 500;
  }
  /* Active accent rail on the leading edge */
  .cn-side-list a.active::before {
    content: '';
    position: absolute;
    left: -3px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    border-radius: 1px;
    background: var(--uin-accent);
  }
  .cn-content {
    min-width: 0;
  }

  @media (max-width: 760px) {
    .cn-layout {
      grid-template-columns: 1fr;
    }
    .cn-side {
      position: static;
      max-height: none;
      margin-bottom: var(--uin-s-5);
      padding: var(--uin-s-2);
    }
  }
</style>
