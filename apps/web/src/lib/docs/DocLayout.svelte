<script lang="ts">
  import type {Snippet} from 'svelte';

  type Props = {
    title: string;
    category: string;
    description: string;
    backHref?: string;
    backLabel?: string;
    children: Snippet;
  };

  let {
    title,
    category,
    description,
    backHref = '/components',
    backLabel = 'Components',
    children
  }: Props = $props();
</script>

<article class="doc">
  <header class="doc-head">
    <a class="doc-back" href={backHref}>Back to {backLabel}</a>
    <p class="doc-cat">{category}</p>
    <h1 class="doc-title">{title}</h1>
    <p class="doc-desc">{description}</p>
  </header>
  <div class="doc-body">
    {@render children()}
  </div>
</article>

<style>
  .doc {
    min-width: 0;
  }
  .doc-head {
    margin-bottom: var(--uin-s-6);
    padding-bottom: var(--uin-s-5);
    border-bottom: 1px solid var(--uin-line);
    animation: uin-doc-in 320ms var(--uin-ease-standard) both;
  }
  .doc-back {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-1);
    margin-bottom: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    background: var(--uin-mat-row);
    padding: 4px 10px;
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .doc-back:hover {
    background: var(--uin-mat-hover);
    border-color: var(--uin-line-strong);
    color: var(--uin-fg);
  }
  .doc-cat {
    margin: 0 0 var(--uin-s-2);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .doc-title {
    margin: 0 0 var(--uin-s-2);
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(32px, 4.5vw, 48px);
    line-height: 1.02;
    letter-spacing: -0.026em;
    color: var(--uin-fg);
  }
  .doc-desc {
    margin: 0;
    max-width: 680px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--uin-fg-mute);
  }
  .doc-body {
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-7);
    animation: uin-doc-in 360ms var(--uin-ease-standard) 80ms both;
  }

  /* Each child of doc-body cascades in slightly later than its sibling */
  .doc-body > :global(*) {
    animation: uin-doc-section-in 320ms var(--uin-ease-standard) both;
  }
  .doc-body > :global(:nth-child(1)) { animation-delay: 100ms; }
  .doc-body > :global(:nth-child(2)) { animation-delay: 160ms; }
  .doc-body > :global(:nth-child(3)) { animation-delay: 220ms; }
  .doc-body > :global(:nth-child(4)) { animation-delay: 280ms; }
  .doc-body > :global(:nth-child(n+5)) { animation-delay: 340ms; }

  @keyframes uin-doc-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes uin-doc-section-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .doc-head,
    .doc-body,
    .doc-body > :global(*) {
      animation: none;
    }
  }
</style>
