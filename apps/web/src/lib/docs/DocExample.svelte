<script lang="ts">
  import type {Snippet} from 'svelte';

  type Props = {
    title?: string;
    description?: string;
    code: string;
    children: Snippet;
  };

  let {title, description, code, children}: Props = $props();

  let copied = $state(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 1200);
    } catch {
      /* clipboard API unavailable; ignore */
    }
  }
</script>

<div class="doc-ex">
  {#if title}
    <div class="doc-ex-head">
      <h3 class="doc-ex-title">{title}</h3>
      {#if description}<p class="doc-ex-desc">{description}</p>{/if}
    </div>
  {/if}
  <div class="doc-ex-preview">
    {@render children()}
  </div>
  <div class="doc-ex-codewrap">
    <button class="doc-ex-copy" type="button" onclick={copy} aria-label="Copy code">
      {copied ? 'copied' : 'copy'}
    </button>
    <pre class="doc-ex-code"><code>{code}</code></pre>
  </div>
</div>

<style>
  .doc-ex {
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    overflow: hidden;
    background: var(--uin-mat-row);
  }
  .doc-ex-head {
    padding: var(--uin-s-3) var(--uin-s-4);
    border-bottom: 1px solid var(--uin-line);
  }
  .doc-ex-title {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
    color: var(--uin-fg);
  }
  .doc-ex-desc {
    margin: 4px 0 0;
    font-size: 12px;
    color: var(--uin-fg-mute);
    line-height: 1.45;
  }
  .doc-ex-preview {
    padding: var(--uin-s-5);
    background: var(--uin-bg-base);
    border-bottom: 1px solid var(--uin-line);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--uin-s-3);
    min-height: 80px;
  }
  .doc-ex-codewrap {
    position: relative;
    background: var(--uin-mat-panel);
  }
  .doc-ex-copy {
    position: absolute;
    top: var(--uin-s-2);
    right: var(--uin-s-2);
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-row);
    color: var(--uin-fg-mute);
    font-size: 11px;
    padding: 4px 8px;
    border-radius: var(--uin-r-sm);
    cursor: pointer;
    font-family: var(--uin-font-ui);
    transition: color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .doc-ex-copy:hover { color: var(--uin-fg); }
  .doc-ex-code {
    margin: 0;
    padding: var(--uin-s-3) var(--uin-s-4);
    overflow-x: auto;
    font-family: var(--uin-font-mono);
    font-size: 12px;
    line-height: 1.55;
    color: var(--uin-fg);
  }
  .doc-ex-code code {
    font-family: inherit;
  }
</style>
