<!--
@component PinInput / OTP — fixed-length code entry field.

Renders `length` single-character inputs side by side. Typing a digit
auto-focuses the next box; backspace clears the current and moves
back. Pasting a code fills all boxes at once, even from clipboard.

Bind `value` as a string. `length` controls the number of slots
(default 6, the OTP standard). `mask` swaps visible characters for
dots (used for security codes — sometimes).

CSS lives in `./pin-input.css`.
-->
<script lang="ts">
  import {onMount} from 'svelte';
  import {cn} from '../../lib/cn';

  type Props = {
    value?: string;
    length?: number;
    onComplete?: (code: string) => void;
    autoFocus?: boolean;
    mask?: boolean;
    pattern?: 'numeric' | 'alphanumeric';
    class?: string;
    ariaLabel?: string;
    disabled?: boolean;
  };

  let {
    value = $bindable(''),
    length = 6,
    onComplete,
    autoFocus = false,
    mask = false,
    pattern = 'numeric',
    class: className,
    ariaLabel = 'Verification code',
    disabled = false,
  }: Props = $props();

  const slots = $derived(Array.from({length}, (_, i) => value.charAt(i) ?? ''));
  let inputs: (HTMLInputElement | null)[] = $state([]);

  const allowed = $derived(pattern === 'numeric' ? /^\d$/ : /^[a-zA-Z0-9]$/);

  function setChar(i: number, ch: string) {
    const padded = value.padEnd(length, ' ').slice(0, length).split('');
    padded[i] = ch || ' ';
    const next = padded.join('').replace(/ +$/, '');
    value = next;
    if (next.length === length && !next.includes(' ')) {
      onComplete?.(next);
    }
  }

  function focus(i: number) {
    inputs[i]?.focus();
    inputs[i]?.select();
  }

  function onInput(i: number, e: Event) {
    const t = e.target as HTMLInputElement;
    const raw = t.value.slice(-1);
    if (raw && !allowed.test(raw)) {
      t.value = slots[i] ?? '';
      return;
    }
    setChar(i, raw);
    if (raw && i < length - 1) focus(i + 1);
  }

  function onKey(i: number, e: KeyboardEvent) {
    const t = e.target as HTMLInputElement;
    if (e.key === 'Backspace') {
      if (t.value) {
        // let default clear the value
        return;
      }
      e.preventDefault();
      if (i > 0) {
        setChar(i - 1, '');
        focus(i - 1);
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      e.preventDefault();
      focus(i - 1);
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      e.preventDefault();
      focus(i + 1);
    }
  }

  onMount(() => {
    if (autoFocus) inputs[0]?.focus();
  });

  function onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const data = e.clipboardData?.getData('text') ?? '';
    const filtered = data.split('').filter((c) => allowed.test(c)).slice(0, length).join('');
    if (!filtered) return;
    value = filtered;
    if (filtered.length === length) onComplete?.(filtered);
    focus(Math.min(filtered.length, length - 1));
  }
</script>

<div
  class={cn('uin-pin', disabled && 'uin-pin-disabled', className)}
  role="group"
  aria-label={ariaLabel}
>
  {#each slots as ch, i}
    <input
      bind:this={inputs[i]}
      type={mask ? 'password' : 'text'}
      inputmode={pattern === 'numeric' ? 'numeric' : 'text'}
      autocomplete={i === 0 ? 'one-time-code' : 'off'}
      maxlength="1"
      class="uin-pin-slot"
      value={ch}
      {disabled}
      oninput={(e) => onInput(i, e)}
      onkeydown={(e) => onKey(i, e)}
      onpaste={onPaste}
      onfocus={(e) => (e.target as HTMLInputElement).select()}
    />
  {/each}
</div>
