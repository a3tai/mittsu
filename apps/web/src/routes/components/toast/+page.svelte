<script lang="ts">
  import Toaster from '@a3tai/mittsu-svelte5/components/toast/toaster.svelte';
  import {toast} from '@a3tai/mittsu-svelte5/components/toast/toast.svelte.js';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'position', type: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'", default: "'top-right'", description: 'Where the stack lands on screen.'},
  ];

  const toastApi = [
    {name: 'toast({title, description?, variant?, duration?, action?})', type: 'function', description: 'Push a toast onto the queue. Returns the toast id.'},
    {name: 'toast.success(opts)', type: 'function', description: 'Shorthand for variant=success.'},
    {name: 'toast.warn(opts)', type: 'function', description: 'Shorthand for variant=warn.'},
    {name: 'toast.error(opts)', type: 'function', description: 'Shorthand for variant=danger.'},
    {name: 'dismiss(id)', type: 'function', description: 'Manually dismiss a toast.'},
    {name: 'dismissAll()', type: 'function', description: 'Clear the queue.'},
  ];

  // Note: `<scr` + `ipt>` split prevents the Svelte parser from seeing the
  // literal closing tag inside this script block.
  const mountCode =
    '<scr' + 'ipt>\n' +
    "  import Toaster from '$lib/components/ui/toast/toaster.svelte';\n" +
    '</scr' + 'ipt>\n' +
    '\n' +
    '<slot />\n' +
    '<Toaster position="top-right" />';
</script>

<!-- Toaster is mounted globally in the root layout; toasts surface at bottom-right. -->

<DocLayout
  title="Toast"
  category="Feedback"
  description="Sonner-style notification queue. Mount <Toaster /> once near the app root, then call toast() imperatively from anywhere — module-scope $state powers the queue."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`import {toast} from '$lib/components/ui/toast/toast.svelte.js';

toast({title: 'Saved', description: 'Your changes are live.'});`}>
      <Button onclick={() => toast({title: 'Saved', description: 'Your changes are live.'})}>
        Push toast
      </Button>
    </DocExample>

    <DocExample title="Variants" code={`toast.success({title: 'Imported 1,204 books'});
toast.warn({title: 'Some files were skipped'});
toast.error({title: 'Upload failed', description: 'Network error.'});`}>
      <Button variant="outline" onclick={() => toast.success({title: 'Imported 1,204 books'})}>Success</Button>
      <Button variant="outline" onclick={() => toast.warn({title: 'Some files were skipped'})}>Warn</Button>
      <Button variant="outline" onclick={() => toast.error({title: 'Upload failed', description: 'Network error.'})}>Error</Button>
    </DocExample>

    <DocExample title="With action" code={`toast({
  title: 'Book deleted',
  action: {label: 'Undo', onClick: () => /* restore */}
});`}>
      <Button onclick={() => toast({
        title: 'Book deleted',
        action: {label: 'Undo', onClick: () => toast.success({title: 'Restored'})},
        duration: 6000,
      })}>Delete with undo</Button>
    </DocExample>

    <DocExample title="Sticky" code={`toast({title: 'Pinned', duration: Infinity});`}>
      <Button variant="ghost" onclick={() => toast({title: 'Pinned — dismiss manually', duration: Infinity})}>
        Sticky toast
      </Button>
    </DocExample>
  </DocSection>

  <DocSection title="Imperative API">
    <DocProps props={toastApi} />
  </DocSection>

  <DocSection title="Component props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add toast`} />
    <DocCode label="Mount in your root layout" code={mountCode} />
  </DocSection>
</DocLayout>
