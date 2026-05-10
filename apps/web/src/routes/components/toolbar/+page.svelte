<script lang="ts">
  import Toolbar from '@a3tai/mittsu-svelte5/components/toolbar/toolbar.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Separator from '@a3tai/mittsu-svelte5/components/separator/separator.svelte';
  import SearchInput from '@a3tai/mittsu-svelte5/components/search-input/search-input.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'density', type: "'compact' | 'comfortable' | 'roomy'", default: "'comfortable'", description: 'Height tier (32 / 40 / 48 px).'},
    {name: 'bordered', type: 'boolean', default: 'true', description: 'Show the bottom hairline.'},
    {name: 'children', type: 'Snippet', description: 'Toolbar items — Button, IconButton, Separator, SearchInput, etc.'},
  ];
</script>

<DocLayout
  title="Toolbar"
  category="Shell"
  description="Horizontal action strip. Frosted backdrop + no-drag region for Tauri/Wails app windows."
>
  <DocSection title="Examples">
    <DocExample title="Mixed actions" code={`<Toolbar>
  <Button size="sm">Save</Button>
  <Separator orientation="vertical" />
  <Button variant="ghost" size="sm">Cancel</Button>
</Toolbar>`}>
      <div style="width:100%; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <Toolbar>
          <Button size="sm">Save</Button>
          <Button variant="ghost" size="sm">Discard</Button>
          <span style="flex:1;"></span>
          <SearchInput showShortcut={false} placeholder="Search…" />
        </Toolbar>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add toolbar`} />
  </DocSection>
</DocLayout>
