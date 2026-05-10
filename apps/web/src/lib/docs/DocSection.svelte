<script lang="ts">
  import type {Snippet} from 'svelte';

  type Props = {
    title: string;
    children: Snippet;
  };

  let {title, children}: Props = $props();
</script>

<section class="doc-sec">
  <h2 class="doc-sec-title">{title}</h2>
  <div class="doc-sec-body">{@render children()}</div>
</section>

<style>
  .doc-sec {
    display: flex;
    flex-direction: column;
  }
  .doc-sec-title {
    margin: 0 0 var(--uin-s-3);
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 18px;
    color: var(--uin-fg);
  }
  .doc-sec-body {
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-4);
  }
</style>
