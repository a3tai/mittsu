<script lang="ts">
  import {base} from '$app/paths';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import Typography from '@a3tai/mittsu-svelte5/components/typography/typography.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import Separator from '@a3tai/mittsu-svelte5/components/separator/separator.svelte';
  import Container from '@a3tai/mittsu-svelte5/components/container/container.svelte';
  import Section from '@a3tai/mittsu-svelte5/components/section/section.svelte';
  import Stack from '@a3tai/mittsu-svelte5/components/stack/stack.svelte';
  import HStack from '@a3tai/mittsu-svelte5/components/hstack/hstack.svelte';
  import Flex from '@a3tai/mittsu-svelte5/components/flex/flex.svelte';
  import AspectRatio from '@a3tai/mittsu-svelte5/components/aspect-ratio/aspect-ratio.svelte';
  import Sheet from '@a3tai/mittsu-svelte5/components/sheet/sheet.svelte';
  import Input from '@a3tai/mittsu-svelte5/components/input/input.svelte';
  import Label from '@a3tai/mittsu-svelte5/components/label/label.svelte';
  import NativeSelect from '@a3tai/mittsu-svelte5/components/native-select/native-select.svelte';
  import Chip from '@a3tai/mittsu-svelte5/components/chip/chip.svelte';

  type Product = {
    id: string;
    name: string;
    tag: string;
    price: number;
    blurb: string;
    detail: string;
    image: string;
    edition?: string;
  };

  const products: Product[] = [
    {
      id: 'p1',
      name: 'Studio headphones',
      tag: 'Audio',
      price: 249,
      blurb: 'Closed-back, neutrally tuned for long sessions.',
      detail: 'Walnut yokes · 40mm bio-cellulose · braided 1.8m cable.',
      image: `${base}/products/headphones.jpg`,
      edition: 'Edition of 200',
    },
    {
      id: 'p2',
      name: 'Cypress keyboard',
      tag: 'Desk',
      price: 189,
      blurb: 'Low-profile mechanical with quiet tactile switches.',
      detail: 'Hot-swappable · PBT keycaps · USB-C.',
      image: `${base}/products/keyboard.jpg`,
    },
    {
      id: 'p3',
      name: 'Atelier hub',
      tag: 'Accessories',
      price: 79,
      blurb: 'A pocketable USB-C hub that pulls its weight.',
      detail: 'HDMI 2.1 · SD · 100W PD pass-through.',
      image: `${base}/products/hub.jpg`,
    },
    {
      id: 'p4',
      name: 'Plinth trackpad stand',
      tag: 'Ergonomics',
      price: 54,
      blurb: 'Smoked glass with a soft inertial damping pad.',
      detail: 'Hand-polished edge · cork base · 1.4kg.',
      image: `${base}/products/stand.jpg`,
    },
    {
      id: 'p5',
      name: 'Field notes, set of three',
      tag: 'Paper',
      price: 18,
      blurb: 'Pocket-bound dot grid for sketches and lists.',
      detail: 'Archival 80gsm · 64 pages · lay-flat spine.',
      image: `${base}/products/notebooks.jpg`,
    },
    {
      id: 'p6',
      name: 'Oat ceramic mug',
      tag: 'Home',
      price: 32,
      blurb: 'Thrown in small batches, glazed by hand.',
      detail: 'Stoneware · matte glaze · 280ml.',
      image: `${base}/products/mug.jpg`,
      edition: 'Spring run',
    },
  ];

  const filters = ['All', 'Desk', 'Audio', 'Paper', 'Home'] as const;
  type Filter = (typeof filters)[number];
  let activeFilter = $state<Filter>('All');

  const visibleProducts = $derived(
    activeFilter === 'All' ? products : products.filter((p) => p.tag === activeFilter)
  );

  let cartOpen = $state(false);
  let cartQty = $state<Record<string, number>>({});

  function addToCart(id: string) {
    cartQty = {...cartQty, [id]: (cartQty[id] ?? 0) + 1};
  }
  function decFromCart(id: string) {
    const n = (cartQty[id] ?? 0) - 1;
    const next = {...cartQty};
    if (n <= 0) delete next[id];
    else next[id] = n;
    cartQty = next;
  }

  const cartLines = $derived(
    products
      .map((p) => ({product: p, qty: cartQty[p.id] ?? 0}))
      .filter((l) => l.qty > 0)
  );
  const subtotal = $derived(cartLines.reduce((s, l) => s + l.product.price * l.qty, 0));
  const cartCount = $derived(cartLines.reduce((s, l) => s + l.qty, 0));

  let shipSpeed = $state<'std' | 'exp'>('std');
  const shipOptions = [
    {value: 'std' as const, label: 'Standard — arrives 3-5 days · free'},
    {value: 'exp' as const, label: 'Express — arrives in 2 days · $12'},
  ];

  const featured = products[0];
</script>

<div class="shop">
  <header class="shop-top">
    <Container>
      <HStack justify="between" align="center" class="shop-top-row">
        <HStack gap={3} align="center" class="shop-top-brand">
          <span class="shop-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 8.5h18M3 12h18M3 15.5h18" />
            </svg>
          </span>
          <span class="shop-word">Mittsu Supply Co.</span>
        </HStack>
        <nav class="shop-nav" aria-label="Primary">
          <a href="#shop">Shop</a>
          <a href="#journal">Journal</a>
          <a href="#studio">Studio</a>
          <a href="#stockists">Stockists</a>
        </nav>
        <HStack gap={2} align="center">
          <button type="button" class="shop-iconbtn" aria-label="Search">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5l3 3" />
            </svg>
          </button>
          <Button variant="outline" size="sm" type="button" onclick={() => (cartOpen = true)} class="shop-cart-btn">
            Bag <span class="shop-cart-count">{cartCount}</span>
          </Button>
        </HStack>
      </HStack>
    </Container>
  </header>

  <section class="shop-hero">
    <Container class="shop-hero-container">
      <div class="shop-hero-grid">
        <Stack gap={4} class="shop-hero-text">
          <span class="shop-eyebrow">Spring catalog — Vol. 03</span>
          <h1 class="shop-headline">Quiet tools<br/>for considered work.</h1>
          <p class="shop-lead">
            Six new pieces from our studio in Aarhus, photographed where they live: on real desks,
            beside half-finished sketches, paired with mid-afternoon coffee.
          </p>
          <HStack gap={2} class="shop-hero-cta">
            <Button variant="primary" type="button">Shop the collection</Button>
            <Button variant="ghost" type="button">
              Read the field notes
              <span class="shop-arrow" aria-hidden="true">→</span>
            </Button>
          </HStack>
          <HStack gap={4} align="center" class="shop-hero-meta">
            <div class="shop-hero-stat">
              <span class="shop-hero-stat-num">6</span>
              <span class="shop-hero-stat-label">New pieces</span>
            </div>
            <div class="shop-hero-stat">
              <span class="shop-hero-stat-num">12</span>
              <span class="shop-hero-stat-label">Hands involved</span>
            </div>
            <div class="shop-hero-stat">
              <span class="shop-hero-stat-num">Aarhus</span>
              <span class="shop-hero-stat-label">Studio</span>
            </div>
          </HStack>
        </Stack>
        <div class="shop-hero-art">
          <img src="{base}/hero/shop-hero.jpg" alt="Quiet workspace still-life with notebook, mug, and reading glasses" loading="eager" />
          <span class="shop-hero-chip">In studio · Spring '26</span>
        </div>
      </div>
    </Container>
  </section>

  <section class="shop-feature" id="shop">
    <Container>
      <HStack justify="between" align="end" class="shop-feature-head">
        <Stack gap={1}>
          <span class="shop-eyebrow">Featured</span>
          <Typography variant="h2" as="h2" class="shop-feature-title">A new headphone, finally finished.</Typography>
        </Stack>
        <a href="#all" class="shop-link">See full notes →</a>
      </HStack>
      <div class="shop-feature-card">
        <div class="shop-feature-art">
          <img src={featured.image} alt={featured.name} loading="lazy" />
        </div>
        <Stack gap={3} class="shop-feature-text">
          <Badge variant="outline">{featured.edition ?? featured.tag}</Badge>
          <Typography variant="h2" as="h3" class="shop-feature-name">{featured.name}</Typography>
          <p class="shop-feature-blurb">{featured.blurb} {featured.detail}</p>
          <HStack gap={3} align="center" class="shop-feature-buy">
            <span class="shop-feature-price">${featured.price}</span>
            <Button variant="primary" type="button" onclick={() => addToCart(featured.id)}>Add to bag</Button>
            <span class="shop-feature-ship">Ships within 48h · carbon-neutral</span>
          </HStack>
        </Stack>
      </div>
    </Container>
  </section>

  <section class="shop-grid-wrap" id="all">
    <Container>
      <HStack justify="between" align="end" class="shop-grid-head">
        <Stack gap={1}>
          <span class="shop-eyebrow">The shelf</span>
          <Typography variant="h2" as="h2" class="shop-grid-title">Browse everything</Typography>
        </Stack>
        <HStack gap={1} class="shop-filters">
          {#each filters as f}
            <Chip active={activeFilter === f} onClick={() => (activeFilter = f)}>{f}</Chip>
          {/each}
        </HStack>
      </HStack>

      <div class="shop-grid">
        {#each visibleProducts as p (p.id)}
          <article class="shop-card">
            <div class="shop-card-art">
              <img src={p.image} alt={p.name} loading="lazy" />
              {#if p.edition}
                <span class="shop-card-edition">{p.edition}</span>
              {/if}
              <button type="button" class="shop-card-quickadd" onclick={() => addToCart(p.id)} aria-label="Add {p.name} to bag">
                + Add
              </button>
            </div>
            <Stack gap={1} class="shop-card-body">
              <HStack justify="between" align="center">
                <span class="shop-card-tag">{p.tag}</span>
                <span class="shop-card-price">${p.price}</span>
              </HStack>
              <Typography variant="h4" as="h3" class="shop-card-name">{p.name}</Typography>
              <p class="shop-card-detail">{p.detail}</p>
            </Stack>
          </article>
        {/each}
      </div>
    </Container>
  </section>

  <section class="shop-quote" id="journal">
    <Container>
      <div class="shop-quote-card">
        <span class="shop-quote-mark" aria-hidden="true">“</span>
        <p class="shop-quote-text">
          Every piece we sell is small enough to put down, durable enough to keep, and quiet enough to leave you alone.
        </p>
        <HStack gap={3} align="center" class="shop-quote-meta">
          <span class="shop-quote-name">Inge Madsen</span>
          <span class="shop-quote-sep" aria-hidden="true">·</span>
          <span class="shop-quote-role">Studio principal</span>
        </HStack>
      </div>
    </Container>
  </section>

  <section class="shop-checkout-section" id="checkout">
    <Container>
      <HStack justify="between" align="end" class="shop-checkout-head">
        <Stack gap={1}>
          <span class="shop-eyebrow">Checkout preview</span>
          <Typography variant="h2" as="h2">Almost there.</Typography>
        </Stack>
        <span class="shop-checkout-note">Read-only — demo only.</span>
      </HStack>
      <Card class="shop-checkout-card" padding={false}>
        <div class="shop-checkout-grid">
          <Stack gap={4} class="shop-checkout-form">
            <Stack gap={2}>
              <Label for="email">Email</Label>
              <Input id="email" value="you@example.com" readonly />
            </Stack>
            <Stack gap={2}>
              <Label for="addr">Ship to</Label>
              <Input id="addr" value="742 Evergreen Terrace, Springfield" readonly />
            </Stack>
            <Stack gap={2}>
              <Label for="ship">Shipping</Label>
              <NativeSelect id="ship" options={shipOptions} bind:value={shipSpeed} />
            </Stack>
          </Stack>
          <div class="shop-checkout-summary">
            <span class="shop-eyebrow">Order summary</span>
            <Stack gap={3} class="shop-summary-lines">
              {#if cartLines.length === 0}
                <p class="shop-summary-empty">Your bag is empty — add a piece from the shelf.</p>
              {:else}
                {#each cartLines as line}
                  <HStack justify="between" align="start">
                    <span class="shop-summary-name">{line.product.name} <span class="shop-summary-qty">×{line.qty}</span></span>
                    <span class="shop-summary-price">${(line.product.price * line.qty).toFixed(2)}</span>
                  </HStack>
                {/each}
              {/if}
            </Stack>
            <Separator />
            <Stack gap={2}>
              <HStack justify="between">
                <span class="shop-summary-row-label">Subtotal</span>
                <span class="shop-summary-row-value">${subtotal.toFixed(2)}</span>
              </HStack>
              <HStack justify="between">
                <span class="shop-summary-row-label">Shipping</span>
                <span class="shop-summary-row-value">{shipSpeed === 'exp' ? '$12.00' : 'Free'}</span>
              </HStack>
            </Stack>
            <Separator />
            <HStack justify="between" align="center" class="shop-summary-total">
              <span>Total</span>
              <span>${(subtotal + (shipSpeed === 'exp' ? 12 : 0)).toFixed(2)}</span>
            </HStack>
            <Button variant="primary" type="button" class="shop-pay" disabled>Pay (demo)</Button>
            <p class="shop-checkout-fine">Encrypted at rest. Returns accepted within 30 days, no questions asked.</p>
          </div>
        </div>
      </Card>
    </Container>
  </section>

  <footer class="shop-foot">
    <Container>
      <div class="shop-foot-grid">
        <Stack gap={2} class="shop-foot-brand">
          <span class="shop-word">Mittsu Supply Co.</span>
          <span class="shop-foot-note">A studio in Aarhus making considered objects for considered desks.</span>
        </Stack>
        <Stack gap={2}>
          <span class="shop-foot-label">Catalog</span>
          <a href="#shop">Shop</a>
          <a href="#journal">Journal</a>
          <a href="#stockists">Stockists</a>
        </Stack>
        <Stack gap={2}>
          <span class="shop-foot-label">Studio</span>
          <a href="#studio">About</a>
          <a href="#press">Press kit</a>
          <a href="#contact">Contact</a>
        </Stack>
        <Stack gap={2}>
          <span class="shop-foot-label">Letters</span>
          <span class="shop-foot-note">One short note each season. Nothing else.</span>
          <form class="shop-foot-form" onsubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email" />
            <button type="submit">Join</button>
          </form>
        </Stack>
      </div>
      <Separator />
      <HStack justify="between" align="center" class="shop-foot-fine">
        <span>© 2026 Mittsu Supply Co. — example storefront</span>
        <span>Crafted with @a3tai/mittsu-svelte5</span>
      </HStack>
    </Container>
  </footer>
</div>

<Sheet bind:open={cartOpen} title="Your bag" description="Adjust quantities or continue to checkout below." side="right" size="md">
  <Stack gap={3} class="shop-cart-stack">
    {#if cartLines.length === 0}
      <div class="shop-cart-empty">
        <span class="shop-cart-empty-mark" aria-hidden="true">○</span>
        <Typography variant="h4" as="p">Nothing here yet</Typography>
        <Typography variant="caption" tone="muted">Pick something from the shelf — your bag will fill in.</Typography>
      </div>
    {:else}
      {#each cartLines as line (line.product.id)}
        <div class="shop-cart-line">
          <div class="shop-cart-line-art">
            <img src={line.product.image} alt={line.product.name} loading="lazy" />
          </div>
          <Stack gap={1} class="shop-cart-line-text">
            <span class="shop-cart-line-name">{line.product.name}</span>
            <span class="shop-cart-line-detail">{line.product.detail}</span>
            <HStack gap={2} align="center" class="shop-cart-line-bottom">
              <div class="shop-qty">
                <button type="button" aria-label="Decrement" onclick={() => decFromCart(line.product.id)}>−</button>
                <span>{line.qty}</span>
                <button type="button" aria-label="Increment" onclick={() => addToCart(line.product.id)}>+</button>
              </div>
              <span class="shop-cart-line-price">${(line.product.price * line.qty).toFixed(2)}</span>
            </HStack>
          </Stack>
        </div>
      {/each}
    {/if}
  </Stack>
  {#snippet footer()}
    <Stack gap={2} class="shop-cart-foot">
      <HStack justify="between" align="center">
        <span class="shop-cart-foot-label">Subtotal</span>
        <span class="shop-cart-foot-value">${subtotal.toFixed(2)}</span>
      </HStack>
      <Button variant="primary" type="button" class="shop-cart-cta" onclick={() => (cartOpen = false)}>
        Continue to checkout
      </Button>
      <span class="shop-cart-foot-fine">Shipping calculated next · returns within 30 days</span>
    </Stack>
  {/snippet}
</Sheet>

<style>
  .shop {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--uin-mat-window);
  }

  /* Header ------------------------------------------------------------ */
  .shop-top {
    position: sticky;
    top: 0;
    z-index: 8;
    background: color-mix(in srgb, var(--uin-mat-window) 86%, transparent);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--uin-line);
  }
  :global(.shop-top-row) {
    padding: var(--uin-s-3) 0;
  }
  :global(.shop-top-brand) {
    color: var(--uin-fg);
  }
  .shop-mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: linear-gradient(140deg, color-mix(in srgb, var(--uin-fg) 92%, transparent), color-mix(in srgb, var(--uin-fg) 60%, transparent));
    color: var(--uin-mat-window);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .shop-word {
    font-family: var(--uin-font-display);
    font-size: 16px;
    letter-spacing: -0.015em;
    font-weight: 500;
  }
  .shop-nav {
    display: inline-flex;
    gap: var(--uin-s-4);
  }
  .shop-nav a {
    font-size: 12.5px;
    color: var(--uin-fg-mute);
    text-decoration: none;
    transition: color var(--uin-dur-1);
  }
  .shop-nav a:hover {
    color: var(--uin-fg);
  }
  .shop-iconbtn {
    appearance: none;
    background: transparent;
    border: 1px solid var(--uin-line);
    color: var(--uin-fg-mute);
    width: 30px;
    height: 30px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color var(--uin-dur-1), border-color var(--uin-dur-1);
  }
  .shop-iconbtn:hover {
    color: var(--uin-fg);
    border-color: var(--uin-line-strong);
  }
  .shop-cart-count {
    display: inline-block;
    margin-left: 6px;
    padding: 0 6px;
    border-radius: 999px;
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }

  /* Hero -------------------------------------------------------------- */
  .shop-hero {
    padding: var(--uin-s-8) 0 var(--uin-s-7);
    background:
      radial-gradient(ellipse at top left, color-mix(in srgb, var(--uin-accent) 5%, transparent), transparent 50%),
      var(--uin-mat-window);
  }
  :global(.shop-hero-container) {
    position: relative;
  }
  .shop-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: var(--uin-s-7);
    align-items: center;
  }
  :global(.shop-hero-text) {
    max-width: 480px;
  }
  .shop-eyebrow {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .shop-headline {
    font-family: var(--uin-font-display);
    font-weight: 400;
    font-size: clamp(40px, 5.8vw, 64px);
    line-height: 1.02;
    letter-spacing: -0.025em;
    margin: 0;
    color: var(--uin-fg);
  }
  .shop-lead {
    font-size: 15px;
    line-height: 1.55;
    color: var(--uin-fg-mute);
    margin: 0;
    max-width: 440px;
  }
  :global(.shop-hero-cta) {
    flex-wrap: wrap;
  }
  .shop-arrow {
    display: inline-block;
    margin-left: 6px;
    transition: transform var(--uin-dur-1);
  }
  :global(.shop-hero-cta) :global(button:hover) .shop-arrow {
    transform: translateX(2px);
  }
  :global(.shop-hero-meta) {
    margin-top: var(--uin-s-2);
    padding-top: var(--uin-s-3);
    border-top: 1px solid var(--uin-line);
    flex-wrap: wrap;
  }
  .shop-hero-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .shop-hero-stat-num {
    font-family: var(--uin-font-display);
    font-size: 22px;
    letter-spacing: -0.015em;
    line-height: 1;
    color: var(--uin-fg);
  }
  .shop-hero-stat-label {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--uin-fg-dim);
  }
  .shop-hero-art {
    position: relative;
    aspect-ratio: 21 / 16;
    border-radius: var(--uin-r-lg);
    overflow: hidden;
    box-shadow: 0 20px 60px -30px color-mix(in srgb, var(--uin-fg) 35%, transparent);
    border: 1px solid var(--uin-line);
  }
  .shop-hero-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .shop-hero-chip {
    position: absolute;
    bottom: var(--uin-s-3);
    left: var(--uin-s-3);
    background: color-mix(in srgb, var(--uin-mat-window) 88%, transparent);
    backdrop-filter: blur(8px);
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 11.5px;
    color: var(--uin-fg);
    font-weight: 500;
  }

  /* Featured product -------------------------------------------------- */
  .shop-feature {
    padding: var(--uin-s-7) 0;
    background: linear-gradient(180deg, transparent, var(--uin-mat-sidebar) 30%, var(--uin-mat-sidebar) 70%, transparent);
  }
  :global(.shop-feature-head) {
    margin-bottom: var(--uin-s-5);
    flex-wrap: wrap;
    gap: var(--uin-s-3);
  }
  :global(.shop-feature-title) {
    font-family: var(--uin-font-display);
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
    max-width: 540px;
  }
  .shop-link {
    color: var(--uin-fg-mute);
    text-decoration: none;
    font-size: 13px;
    transition: color var(--uin-dur-1);
  }
  .shop-link:hover {
    color: var(--uin-fg);
  }
  .shop-feature-card {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: var(--uin-s-6);
    align-items: center;
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    background: var(--uin-mat-window);
    overflow: hidden;
  }
  .shop-feature-art {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: var(--uin-mat-row);
  }
  .shop-feature-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 600ms var(--uin-ease-standard);
  }
  .shop-feature-card:hover .shop-feature-art img {
    transform: scale(1.02);
  }
  :global(.shop-feature-text) {
    padding: var(--uin-s-6);
    max-width: 460px;
  }
  :global(.shop-feature-name) {
    font-family: var(--uin-font-display);
    font-size: clamp(22px, 2.5vw, 30px);
    letter-spacing: -0.018em;
    line-height: 1.1;
    margin: 0;
  }
  .shop-feature-blurb {
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--uin-fg-mute);
    margin: 0;
  }
  :global(.shop-feature-buy) {
    flex-wrap: wrap;
    margin-top: var(--uin-s-2);
  }
  .shop-feature-price {
    font-family: var(--uin-font-display);
    font-size: 26px;
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .shop-feature-ship {
    font-size: 11.5px;
    color: var(--uin-fg-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* Grid -------------------------------------------------------------- */
  .shop-grid-wrap {
    padding: var(--uin-s-7) 0;
  }
  :global(.shop-grid-head) {
    margin-bottom: var(--uin-s-5);
    flex-wrap: wrap;
    gap: var(--uin-s-3);
  }
  :global(.shop-grid-title) {
    font-family: var(--uin-font-display);
    font-size: clamp(24px, 3vw, 32px);
    letter-spacing: -0.02em;
    margin: 0;
  }
  :global(.shop-filters) {
    flex-wrap: wrap;
  }
  .shop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--uin-s-5) var(--uin-s-4);
  }
  .shop-card {
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-3);
  }
  .shop-card-art {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .shop-card-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 480ms var(--uin-ease-standard);
  }
  .shop-card:hover .shop-card-art img {
    transform: scale(1.025);
  }
  .shop-card-edition {
    position: absolute;
    top: var(--uin-s-2);
    left: var(--uin-s-2);
    background: color-mix(in srgb, var(--uin-mat-window) 88%, transparent);
    backdrop-filter: blur(6px);
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid var(--uin-line);
    font-size: 10.5px;
    color: var(--uin-fg-mute);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .shop-card-quickadd {
    position: absolute;
    bottom: var(--uin-s-2);
    right: var(--uin-s-2);
    appearance: none;
    background: var(--uin-fg);
    color: var(--uin-mat-window);
    border: 0;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity var(--uin-dur-2) var(--uin-ease-standard),
                transform var(--uin-dur-2) var(--uin-ease-standard);
  }
  .shop-card:hover .shop-card-quickadd,
  .shop-card-quickadd:focus-visible {
    opacity: 1;
    transform: translateY(0);
  }
  :global(.shop-card-body) {
    padding: 0 2px;
  }
  .shop-card-tag {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .shop-card-price {
    font-family: var(--uin-font-display);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
    color: var(--uin-fg);
  }
  :global(.shop-card-name) {
    font-family: var(--uin-font-display);
    letter-spacing: -0.015em;
    font-size: 17px;
    line-height: 1.25;
    margin: 0;
  }
  .shop-card-detail {
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--uin-fg-mute);
    margin: 0;
  }

  /* Quote / journal --------------------------------------------------- */
  .shop-quote {
    padding: var(--uin-s-7) 0;
  }
  .shop-quote-card {
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
    padding: var(--uin-s-6) var(--uin-s-4);
    border-top: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
    position: relative;
  }
  .shop-quote-mark {
    display: inline-block;
    font-family: var(--uin-font-display);
    font-size: 64px;
    line-height: 0.3;
    color: var(--uin-fg-faint);
  }
  .shop-quote-text {
    font-family: var(--uin-font-display);
    font-size: clamp(22px, 2.6vw, 30px);
    line-height: 1.3;
    letter-spacing: -0.018em;
    color: var(--uin-fg);
    margin: var(--uin-s-3) 0 var(--uin-s-4);
  }
  :global(.shop-quote-meta) {
    justify-content: center;
    font-size: 12.5px;
    color: var(--uin-fg-mute);
  }
  .shop-quote-sep {
    color: var(--uin-fg-faint);
  }

  /* Checkout ---------------------------------------------------------- */
  .shop-checkout-section {
    padding: var(--uin-s-7) 0;
  }
  :global(.shop-checkout-head) {
    margin-bottom: var(--uin-s-5);
    flex-wrap: wrap;
  }
  .shop-checkout-note {
    font-size: 11.5px;
    color: var(--uin-fg-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  :global(.shop-checkout-card) {
    overflow: hidden;
  }
  .shop-checkout-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
  }
  :global(.shop-checkout-form) {
    padding: var(--uin-s-5);
    border-right: 1px solid var(--uin-line);
  }
  .shop-checkout-summary {
    padding: var(--uin-s-5);
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-3);
    background: var(--uin-mat-sidebar);
  }
  :global(.shop-summary-lines) {
    margin-top: var(--uin-s-1);
  }
  .shop-summary-empty {
    font-size: 13px;
    color: var(--uin-fg-mute);
    margin: 0;
  }
  .shop-summary-name {
    font-size: 13px;
  }
  .shop-summary-qty {
    color: var(--uin-fg-dim);
    margin-left: 6px;
    font-variant-numeric: tabular-nums;
  }
  .shop-summary-price {
    font-family: var(--uin-font-mono);
    font-size: 12.5px;
    font-variant-numeric: tabular-nums;
  }
  .shop-summary-row-label {
    color: var(--uin-fg-mute);
    font-size: 13px;
  }
  .shop-summary-row-value {
    font-family: var(--uin-font-mono);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
  :global(.shop-summary-total) {
    font-family: var(--uin-font-display);
    font-size: 18px;
    letter-spacing: -0.01em;
  }
  :global(.shop-pay) {
    width: 100%;
  }
  .shop-checkout-fine {
    font-size: 11px;
    color: var(--uin-fg-dim);
    line-height: 1.5;
    margin: 0;
  }

  /* Footer ------------------------------------------------------------ */
  .shop-foot {
    margin-top: auto;
    padding: var(--uin-s-7) 0 var(--uin-s-4);
    background: var(--uin-mat-sidebar);
    border-top: 1px solid var(--uin-line);
  }
  .shop-foot-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
    gap: var(--uin-s-5);
    margin-bottom: var(--uin-s-5);
  }
  :global(.shop-foot-brand) {
    max-width: 320px;
  }
  .shop-foot-note {
    font-size: 12.5px;
    color: var(--uin-fg-mute);
    line-height: 1.55;
  }
  .shop-foot-label {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .shop-foot a {
    color: var(--uin-fg-mute);
    text-decoration: none;
    font-size: 13px;
    transition: color var(--uin-dur-1);
  }
  .shop-foot a:hover {
    color: var(--uin-fg);
  }
  .shop-foot-form {
    display: flex;
    gap: var(--uin-s-1);
    margin-top: var(--uin-s-1);
  }
  .shop-foot-form input {
    flex: 1;
    appearance: none;
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-window);
    border-radius: var(--uin-r-sm);
    padding: 6px 10px;
    font: inherit;
    font-size: 13px;
    color: var(--uin-fg);
  }
  .shop-foot-form input:focus-visible {
    outline: none;
    box-shadow: var(--uin-focus-ring);
  }
  .shop-foot-form button {
    appearance: none;
    border: 1px solid var(--uin-fg);
    background: var(--uin-fg);
    color: var(--uin-mat-window);
    padding: 6px 14px;
    border-radius: var(--uin-r-sm);
    font: inherit;
    font-size: 12.5px;
    cursor: pointer;
  }
  :global(.shop-foot-fine) {
    padding-top: var(--uin-s-3);
    font-size: 11px;
    color: var(--uin-fg-dim);
    flex-wrap: wrap;
    gap: var(--uin-s-2);
  }

  /* Cart sheet -------------------------------------------------------- */
  :global(.shop-cart-stack) {
    padding-bottom: var(--uin-s-4);
  }
  .shop-cart-empty {
    text-align: center;
    padding: var(--uin-s-6) var(--uin-s-3);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uin-s-2);
  }
  .shop-cart-empty-mark {
    font-family: var(--uin-font-display);
    font-size: 36px;
    color: var(--uin-fg-faint);
    line-height: 1;
  }
  .shop-cart-line {
    display: grid;
    grid-template-columns: 84px 1fr;
    gap: var(--uin-s-3);
    padding: var(--uin-s-3) 0;
    border-bottom: 1px solid var(--uin-line);
  }
  .shop-cart-line:last-child {
    border-bottom: 0;
  }
  .shop-cart-line-art {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: var(--uin-r-sm);
    background: var(--uin-mat-row);
  }
  .shop-cart-line-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  :global(.shop-cart-line-text) {
    line-height: 1.25;
  }
  .shop-cart-line-name {
    font-family: var(--uin-font-display);
    font-size: 15px;
    letter-spacing: -0.012em;
  }
  .shop-cart-line-detail {
    font-size: 12px;
    color: var(--uin-fg-mute);
  }
  :global(.shop-cart-line-bottom) {
    margin-top: var(--uin-s-1);
  }
  .shop-qty {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    overflow: hidden;
    background: var(--uin-mat-row);
  }
  .shop-qty button {
    appearance: none;
    background: transparent;
    border: 0;
    color: var(--uin-fg-mute);
    width: 26px;
    height: 26px;
    font-size: 13px;
    cursor: pointer;
    transition: color var(--uin-dur-1), background-color var(--uin-dur-1);
  }
  .shop-qty button:hover {
    color: var(--uin-fg);
    background: var(--uin-mat-hover);
  }
  .shop-qty span {
    font-size: 12px;
    min-width: 18px;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .shop-cart-line-price {
    margin-left: auto;
    font-family: var(--uin-font-mono);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
  :global(.shop-cart-foot) {
    width: 100%;
  }
  .shop-cart-foot-label {
    color: var(--uin-fg-mute);
    font-size: 13px;
  }
  .shop-cart-foot-value {
    font-family: var(--uin-font-display);
    font-size: 18px;
    letter-spacing: -0.01em;
  }
  :global(.shop-cart-cta) {
    width: 100%;
  }
  .shop-cart-foot-fine {
    font-size: 11px;
    color: var(--uin-fg-dim);
    text-align: center;
  }

  /* Responsive -------------------------------------------------------- */
  @media (max-width: 980px) {
    .shop-hero-grid {
      grid-template-columns: 1fr;
      gap: var(--uin-s-5);
    }
    .shop-feature-card {
      grid-template-columns: 1fr;
    }
    .shop-checkout-grid {
      grid-template-columns: 1fr;
    }
    :global(.shop-checkout-form) {
      border-right: 0;
      border-bottom: 1px solid var(--uin-line);
    }
    .shop-foot-grid {
      grid-template-columns: 1fr 1fr;
    }
    .shop-nav {
      display: none;
    }
  }
  @media (max-width: 680px) {
    .shop-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--uin-s-4) var(--uin-s-3);
    }
    .shop-foot-grid {
      grid-template-columns: 1fr;
    }
    .shop-headline {
      font-size: clamp(34px, 9vw, 50px);
    }
  }
  @media (max-width: 440px) {
    .shop-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
