<script lang="ts">
  import Kbd from '@a3tai/mittsu-svelte5/components/kbd/kbd.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
</script>

<header class="hd">
  <p class="eyebrow">Docs</p>
  <h1>Getting started</h1>
</header>

<section class="block">
  <h2>1. Initialize</h2>
  <p>From your project root:</p>
  <Card>
    <code>npx @a3tai/mittsu@latest init</code>
  </Card>
  <p class="muted">
    This writes <code>components.json</code>, copies <code>tokens.css</code>, and
    drops the <code>cn</code> utility into your project.
  </p>
</section>

<section class="block">
  <h2>2. Import the tokens once</h2>
  <p>From your top-level layout or app entry:</p>
  <Card>
    <code>import './lib/styles/tokens.css';</code>
  </Card>
</section>

<section class="block">
  <h2>3. Add components</h2>
  <p>Pull components in à-la-carte:</p>
  <Card>
    <code>npx @a3tai/mittsu add button badge spinner</code>
  </Card>
  <p class="muted">
    Sibling dependencies tag along automatically — adding
    <code>search-input</code> brings <code>input</code> and <code>kbd</code> along.
  </p>
</section>

<section class="block">
  <h2>4. Use them</h2>
  <Card>
    <pre>{`import Button from '$lib/components/ui/button/button.svelte';

<Button>Hello</Button>`}</pre>
  </Card>
</section>

<section class="block">
  <h2>Keyboard cheat sheet</h2>
  <table class="kbd-table">
    <tbody>
      <tr><td><Kbd>⌘</Kbd> <Kbd>K</Kbd></td><td>Focus search input</td></tr>
      <tr><td><Kbd>Esc</Kbd></td><td>Clear active search / close dialog</td></tr>
      <tr><td><Kbd>Tab</Kbd></td><td>Standard focus traversal — every component is keyboard-friendly by default</td></tr>
    </tbody>
  </table>
</section>

<style>
  .hd { margin: 0 0 var(--uin-s-6); }
  .hd .eyebrow {
    margin: 0 0 6px;
    font-size: 10.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--uin-fg-mute);
    font-weight: 500;
  }
  .hd h1 {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(28px, 4vw, 38px);
    line-height: 1.1;
    letter-spacing: -0.015em;
  }
  .block {
    padding: var(--uin-s-4) 0;
  }
  .block h2 {
    margin: 0 0 var(--uin-s-3);
    font-family: var(--uin-font-display);
    font-size: 17px;
    font-weight: 500;
  }
  .block p { margin: 0 0 var(--uin-s-2); }
  .muted { color: var(--uin-fg-mute); font-size: 13px; }
  code {
    font-family: var(--uin-font-mono);
    font-size: 12.5px;
    color: var(--uin-fg);
  }
  pre {
    margin: 0;
    font-family: var(--uin-font-mono);
    font-size: 12px;
    color: var(--uin-fg);
    white-space: pre-wrap;
  }
  .kbd-table {
    width: 100%;
    border-collapse: collapse;
  }
  .kbd-table td {
    padding: 8px 0;
    border-bottom: 1px solid var(--uin-line);
    font-size: 13px;
  }
  .kbd-table td:first-child {
    width: 140px;
    color: var(--uin-fg-mute);
  }
</style>
