<!--
@component DragHandle — grab indicator for resize / reorder affordances.

A small dotted grip glyph (six dots). Render inside a draggable target
or alongside a resize edge so users see "this can be dragged."
Pure presentational — wire up the drag/resize behavior at the parent.

`orientation` switches the dot grid between vertical (default, for
horizontal drag bars) and horizontal (for vertical drag handles).

CSS lives in `./drag-handle.css`.
-->
<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    orientation?: 'vertical' | 'horizontal';
    class?: string;
  };

  let {orientation = 'vertical', class: className, ...rest}: Props = $props();
</script>

<span
  class={cn('uin-drag', `uin-drag-${orientation}`, className)}
  aria-hidden="true"
  {...rest}
></span>
