<script lang="ts">
  import AppShell from '@a3tai/mittsu-svelte5/components/app-shell/app-shell.svelte';
  import Sidebar from '@a3tai/mittsu-svelte5/components/sidebar/sidebar.svelte';
  import Toolbar from '@a3tai/mittsu-svelte5/components/toolbar/toolbar.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'sidebarSide', type: "'left' | 'right'", default: "'left'", description: 'Which side the sidebar pins to.'},
    {name: 'sidebarWidth', type: 'string', default: "'240px'", description: 'CSS length for the sidebar column.'},
    {name: 'headerHeight', type: 'string', default: "'40px'", description: 'CSS length for the top header.'},
    {name: 'header', type: 'Snippet', description: 'Top region (typically <Toolbar /> or <TitleBar />).'},
    {name: 'sidebar', type: 'Snippet', description: 'Side region (typically <Sidebar />).'},
    {name: 'footer', type: 'Snippet', description: 'Bottom region (status bar, etc.).'},
    {name: 'children', type: 'Snippet', description: 'Main scrollable content.'},
  ];
</script>

<DocLayout
  title="AppShell"
  category="Shell"
  description="Full-window header / sidebar / main / footer scaffold. Compose-style — pass any of the four region snippets and the grid auto-adapts."
>
  <DocSection title="Examples">
    <DocExample title="Compose with Toolbar + Sidebar" code={`<AppShell>
  {#snippet header()}<Toolbar>...</Toolbar>{/snippet}
  {#snippet sidebar()}<Sidebar>...</Sidebar>{/snippet}
  Main content
</AppShell>`}>
      <div style="height:280px; width:100%; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <AppShell sidebarWidth="180px" headerHeight="36px">
          {#snippet header()}
            <Toolbar density="compact">
              <span style="font-weight:500; font-size:12.5px;">Library</span>
            </Toolbar>
          {/snippet}
          {#snippet sidebar()}
            <Sidebar>
              <p style="margin:0; padding:var(--uin-s-2); font-size:12.5px; color:var(--uin-fg-mute);">Sidebar content…</p>
            </Sidebar>
          {/snippet}
          <div style="padding:var(--uin-s-4); color:var(--uin-fg-mute); font-size:13px;">
            Main scrollable region.
          </div>
        </AppShell>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add app-shell`} />
  </DocSection>
</DocLayout>
