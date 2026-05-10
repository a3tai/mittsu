<script lang="ts">
  import AlertDialog from '@a3tai/mittsu-svelte5/components/alert-dialog/alert-dialog.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let confirmOpen = $state(false);
  let dangerOpen = $state(false);
  let result = $state<string>('');

  const props = [
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.'},
    {name: 'title', type: 'string', description: 'Heading text.'},
    {name: 'description', type: 'string', description: 'Body text — replaces the children slot for AlertDialog.'},
    {name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Label for the action button.'},
    {name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Label for the dismiss button.'},
    {name: 'tone', type: "'default' | 'danger'", default: "'default'", description: "'danger' colors the confirm button red."},
    {name: 'onConfirm', type: '() => void', description: 'Called when Confirm is clicked.'},
    {name: 'onCancel', type: '() => void', description: 'Called when Cancel is clicked.'},
  ];
</script>

<DocLayout
  title="AlertDialog"
  category="Overlay"
  description="Confirmation modal for destructive or irreversible actions. role='alertdialog' and overlay-click is disabled — the user must explicitly choose."
>
  <DocSection title="Examples">
    <DocExample title="Confirm" code={`<Button onclick={() => open = true}>Confirm action</Button>
<AlertDialog
  bind:open
  title="Save changes?"
  description="Your edits will be published to the live site."
  onConfirm={() => result = 'confirmed'}
  onCancel={() => result = 'cancelled'}
/>`}>
      <Button onclick={() => (confirmOpen = true)}>Confirm action</Button>
      <span style="color:var(--uin-fg-mute); font-size:12.5px;">{result || '(no choice yet)'}</span>
      <AlertDialog
        bind:open={confirmOpen}
        title="Save changes?"
        description="Your edits will be published to the live site."
        onConfirm={() => (result = 'confirmed')}
        onCancel={() => (result = 'cancelled')}
      />
    </DocExample>

    <DocExample title='tone="danger"' code={`<AlertDialog
  bind:open
  tone="danger"
  title="Delete library?"
  description="This permanently removes 1,204 books and 8,421 passages."
  confirmLabel="Delete"
/>`}>
      <Button variant="outline" onclick={() => (dangerOpen = true)}>Delete library</Button>
      <AlertDialog
        bind:open={dangerOpen}
        tone="danger"
        title="Delete library?"
        description="This permanently removes 1,204 books and 8,421 passages. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => (result = 'deleted')}
        onCancel={() => (result = 'kept')}
      />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add alert-dialog`} />
  </DocSection>
</DocLayout>
