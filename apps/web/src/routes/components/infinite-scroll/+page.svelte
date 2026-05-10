<script lang="ts">
  import InfiniteScroll from '@a3tai/mittsu-svelte5/components/infinite-scroll/infinite-scroll.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let items = $state<number[]>(Array.from({length: 20}, (_, i) => i));
  let loading = $state(false);
  const PAGE_SIZE = 20;
  const MAX = 200;
  const hasMore = $derived(items.length < MAX);

  async function loadMore() {
    if (loading || !hasMore) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 400));
    const next = Array.from({length: PAGE_SIZE}, (_, i) => items.length + i);
    items = [...items, ...next];
    loading = false;
  }

  const props = [
    {name: 'onLoadMore', type: '() => void | Promise<void>', description: 'Fires when the sentinel scrolls into view.'},
    {name: 'loading', type: 'boolean', default: 'false', description: 'Suppress firings while a request is in flight.'},
    {name: 'hasMore', type: 'boolean', default: 'true', description: 'Stops firing once data is exhausted.'},
    {name: 'rootMargin', type: 'string', default: "'0px 0px 200px 0px'", description: 'IntersectionObserver root margin.'},
    {name: 'children', type: 'Snippet', description: 'Your scrollable list.'},
    {name: 'loader', type: 'Snippet', description: 'Override the loading indicator.'},
  ];
</script>

<DocLayout
  title="InfiniteScroll"
  category="Data"
  description="IntersectionObserver-based load-more sentinel. Wrap your list — when the sentinel scrolls into view, onLoadMore fires."
>
  <DocSection title="Examples">
    <DocExample title="Lazy-loading rows" code={`<InfiniteScroll {onLoadMore} {loading} {hasMore}>
  {#each items as id}
    <div>Row {id}</div>
  {/each}
</InfiniteScroll>`}>
      <div style="height:240px; width:100%; max-width:420px; overflow-y:auto; border:1px solid var(--uin-line); border-radius:var(--uin-r-md);">
        <InfiniteScroll onLoadMore={loadMore} {loading} {hasMore}>
          {#each items as id (id)}
            <div style="padding:8px var(--uin-s-3); border-bottom:1px solid var(--uin-line); font-size:12.5px;">
              Row {id + 1}
            </div>
          {/each}
        </InfiniteScroll>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add infinite-scroll`} />
  </DocSection>
</DocLayout>
