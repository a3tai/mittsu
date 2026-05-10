<script lang="ts">
  type Props = {
    code: string;
    label?: string;
  };

  let {code, label}: Props = $props();
</script>

<div class="doc-code">
  {#if label}<p class="doc-code-label">{label}</p>{/if}
  <pre><code>{code}</code></pre>
</div>

<style>
  .doc-code {
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-panel);
    overflow: hidden;
  }
  .doc-code-label {
    margin: 0;
    padding: var(--uin-s-2) var(--uin-s-3);
    background: var(--uin-mat-row);
    border-bottom: 1px solid var(--uin-line);
    font-size: 11px;
    color: var(--uin-fg-mute);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
  }
  pre {
    margin: 0;
    padding: var(--uin-s-3) var(--uin-s-4);
    overflow-x: auto;
    font-family: var(--uin-font-mono);
    font-size: 12px;
    line-height: 1.55;
    color: var(--uin-fg);
  }
  code {
    font-family: inherit;
  }
</style>
