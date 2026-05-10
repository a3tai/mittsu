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
    <a class="doc-back" href={backHref}>← {backLabel}</a>
    <p class="doc-cat">{category}</p>
    <h1 class="doc-title">{title}</h1>
    <p class="doc-desc">{description}</p>
  </header>
  <div class="doc-body">
    {@render children()}
  </div>
</article>

<style>
  .doc-head {
    margin-bottom: var(--uin-s-7);
    animation: uin-doc-in 320ms var(--uin-ease-standard) both;
  }
  .doc-back {
    display: inline-block;
    margin-bottom: var(--uin-s-4);
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    text-decoration: none;
    transition: color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .doc-back:hover {
    color: var(--uin-fg);
  }
  .doc-cat {
    margin: 0 0 4px;
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-mute);
    font-weight: 500;
  }
  .doc-title {
    margin: 0 0 var(--uin-s-2);
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(28px, 4vw, 38px);
    line-height: 1.05;
    letter-spacing: -0.018em;
    color: var(--uin-fg);
  }
  .doc-desc {
    margin: 0;
    max-width: 640px;
    font-size: 14.5px;
    line-height: 1.55;
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
