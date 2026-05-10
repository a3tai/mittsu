<script lang="ts">
  type PropDoc = {
    name: string;
    type: string;
    default?: string;
    description: string;
  };

  type Props = {
    props: PropDoc[];
  };

  let {props}: Props = $props();
</script>

<div class="doc-props">
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each props as p (p.name)}
        <tr>
          <td><code class="doc-props-name">{p.name}</code></td>
          <td><code class="doc-props-type">{p.type}</code></td>
          <td><code class="doc-props-default">{p.default ?? '—'}</code></td>
          <td>{p.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .doc-props {
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }
  th {
    background: var(--uin-mat-row);
    text-align: left;
    padding: var(--uin-s-2) var(--uin-s-3);
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--uin-fg-mute);
    border-bottom: 1px solid var(--uin-line);
    white-space: nowrap;
  }
  td {
    padding: var(--uin-s-2) var(--uin-s-3);
    border-bottom: 1px solid var(--uin-line);
    vertical-align: top;
    color: var(--uin-fg);
    line-height: 1.5;
  }
  tr:last-child td { border-bottom: none; }
  code {
    font-family: var(--uin-font-mono);
    font-size: 11.5px;
    color: var(--uin-fg);
  }
  .doc-props-type { color: var(--uin-fg-mute); }
  .doc-props-default { color: var(--uin-accent); }
</style>
