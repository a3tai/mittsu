<!--
Showcase ⌘K palette. Thin wrapper around the registry's `<Command>`
primitive: maps the components manifest to CommandItems, listens for
the global ⌘K shortcut, navigates on select.
-->
<script lang="ts">
  import {goto} from '$app/navigation';
  import {components} from '$lib/docs';
  import Command from '@a3tai/mittsu-svelte5/components/command/command.svelte';
  import {onMount} from 'svelte';

  let open = $state(false);

  const items = components.map((c) => ({
    value: c.name,
    label: c.title,
    hint: c.description,
    group: c.category,
  }));

  function close() {
    open = false;
  }

  function handleSelect(name: string) {
    close();
    goto(`/components/${name}`);
  }

  function handleGlobalKey(e: KeyboardEvent) {
    const isK = e.key.toLowerCase() === 'k';
    if ((e.metaKey || e.ctrlKey) && isK) {
      e.preventDefault();
      open = !open;
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  });
</script>

{#if open}
  <div
    class="palette-backdrop"
    onclick={close}
    role="presentation"
    onkeydown={(e) => e.key === 'Escape' && close()}
  ></div>
  <div class="palette" role="dialog" aria-label="Command palette" aria-modal="true">
    <Command {items} onSelect={handleSelect} placeholder="Find a component…" />
  </div>
{/if}

<style>
  .palette-backdrop {
    position: fixed;
    inset: 0;
    background: color-mix(in srgb, var(--uin-fg) 30%, transparent);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    z-index: 90;
    animation: fade-in 120ms var(--uin-ease-standard);
  }
  .palette {
    position: fixed;
    top: 18vh;
    left: 50%;
    transform: translateX(-50%);
    width: min(560px, calc(100vw - 32px));
    z-index: 100;
    animation: pop-in 120ms var(--uin-ease-standard);
    box-shadow: 0 20px 60px color-mix(in srgb, #000 32%, transparent);
    border-radius: var(--uin-r-lg);
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pop-in {
    from { opacity: 0; transform: translate(-50%, -8px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
</style>
