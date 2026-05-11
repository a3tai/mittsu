<script lang="ts">
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Typography from '@a3tai/mittsu-svelte5/components/typography/typography.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import Separator from '@a3tai/mittsu-svelte5/components/separator/separator.svelte';
  import Container from '@a3tai/mittsu-svelte5/components/container/container.svelte';
  import Section from '@a3tai/mittsu-svelte5/components/section/section.svelte';
  import Stack from '@a3tai/mittsu-svelte5/components/stack/stack.svelte';
  import HStack from '@a3tai/mittsu-svelte5/components/hstack/hstack.svelte';
  import Kbd from '@a3tai/mittsu-svelte5/components/kbd/kbd.svelte';
  import SegmentedControl from '@a3tai/mittsu-svelte5/components/segmented-control/segmented-control.svelte';

  const features = [
    {
      title: 'Realtime presence',
      body: 'See who is in each workspace as a quiet lamp — never a notification. Designed for offices that read more than they ping.',
      icon: 'presence',
    },
    {
      title: 'Command-first workflows',
      body: 'Every action lives behind ⌘K. Keyboard-first, mouse-optional, screen-reader friendly out of the box.',
      icon: 'palette',
    },
    {
      title: 'Source you own',
      body: 'Components copy into your repo. Fork a button, tune a token, ship in your branch — without waiting on a semver bump.',
      icon: 'source',
    },
    {
      title: 'Audit trail by default',
      body: 'Every write goes through a typed event log. Search it, export it, replay it during incident review.',
      icon: 'log',
    },
    {
      title: 'Tokens, not literals',
      body: 'Every visual property reads from a documented variable. Theming a deployment takes minutes, not a redesign.',
      icon: 'tokens',
    },
    {
      title: 'Quiet by design',
      body: 'No mascots, no marquees, no purple gradients. The accent color is earned, not sprayed across the page.',
      icon: 'quiet',
    },
  ];

  type BillingCycle = 'monthly' | 'yearly';
  let billing = $state<BillingCycle>('yearly');
  const billingOptions = [
    {value: 'monthly' as const, label: 'Monthly'},
    {value: 'yearly' as const, label: 'Yearly · 2 months free'},
  ];

  type Plan = {
    name: string;
    priceMonthly: number | null;
    cadence: string;
    pitch: string;
    bullets: string[];
    cta: string;
    primary: boolean;
  };

  const plans: Plan[] = [
    {
      name: 'Starter',
      priceMonthly: 0,
      cadence: 'forever',
      pitch: 'For solo operators kicking the tires.',
      bullets: ['3 projects', 'Community Discord', 'CLI access', '7-day event retention'],
      cta: 'Start free',
      primary: false,
    },
    {
      name: 'Team',
      priceMonthly: 24,
      cadence: 'per seat',
      pitch: 'For teams that ship together every week.',
      bullets: ['SSO & SCIM', 'Audit log', 'Priority support', 'Unlimited projects', '90-day retention'],
      cta: 'Start 14-day trial',
      primary: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: null,
      cadence: 'volume',
      pitch: 'For regulated industries and large fleets.',
      bullets: ['Dedicated CSM', 'VPC deploy', 'Custom SLA', 'Quarterly review', 'Compliance pack'],
      cta: 'Contact sales',
      primary: false,
    },
  ];

  const logos = ['MERIDIAN', 'EASTWIND', 'KASUGA', 'PINHOLE', 'ARCNOTE', 'STILLWELL'];

  function priceLabel(plan: Plan) {
    if (plan.priceMonthly === null) return 'Talk to us';
    if (plan.priceMonthly === 0) return '$0';
    const monthly = billing === 'yearly' ? Math.round(plan.priceMonthly * 0.83) : plan.priceMonthly;
    return `$${monthly}`;
  }
</script>

<div class="lp">
  <a href="#main" class="lp-skip">Skip to content</a>

  <header class="lp-nav">
    <Container>
      <HStack justify="between" align="center" class="lp-nav-row">
        <HStack gap={3} align="center" class="lp-brand">
          <span class="lp-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="lp-word">Northwind</span>
          <Badge variant="outline" class="lp-pill">v0.4</Badge>
        </HStack>
        <nav class="lp-nav-links" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#system">System</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
          <a href="#changelog">Changelog</a>
        </nav>
        <HStack gap={2} align="center">
          <Button variant="ghost" size="sm" type="button">Sign in</Button>
          <Button variant="primary" size="sm" type="button">Start trial</Button>
        </HStack>
      </HStack>
    </Container>
  </header>

  <main id="main">
    <section class="lp-hero">
      <Container>
        <div class="lp-hero-grid">
          <Stack gap={4} class="lp-hero-text">
            <HStack gap={2} align="center" class="lp-hero-eyebrow">
              <span class="lp-dot" aria-hidden="true"></span>
              <span>Northwind 0.4 — now with cycle planning</span>
              <a href="#changelog" class="lp-hero-eyebrow-link">Read notes →</a>
            </HStack>
            <h1 class="lp-headline">
              Operational clarity,<br/>without the noise.
            </h1>
            <p class="lp-lead">
              Northwind is a workspace for product teams that prefer keyboard shortcuts to alerts —
              a focused inbox, a fast palette, and a tokenized UI you can theme without forking.
            </p>
            <HStack gap={2} class="lp-hero-cta">
              <Button variant="primary" type="button">Book a demo</Button>
              <Button variant="outline" type="button">
                Try locally
                <span class="lp-cta-arrow" aria-hidden="true">→</span>
              </Button>
            </HStack>
            <HStack gap={2} align="center" class="lp-hero-trust">
              <Kbd>⌘</Kbd><Kbd>K</Kbd>
              <span class="lp-hero-trust-text">opens the palette · free during beta · no card</span>
            </HStack>
          </Stack>

          <div class="lp-product">
            <div class="lp-product-window">
              <div class="lp-product-titlebar">
                <span class="lp-tl lp-tl-red" aria-hidden="true"></span>
                <span class="lp-tl lp-tl-amber" aria-hidden="true"></span>
                <span class="lp-tl lp-tl-green" aria-hidden="true"></span>
                <span class="lp-product-titletext">Northwind — Engineering</span>
              </div>
              <div class="lp-product-body">
                <div class="lp-product-side">
                  <div class="lp-product-side-label">Workspace</div>
                  <div class="lp-product-side-item lp-product-side-active">
                    <span class="lp-product-side-glyph"></span>Inbox<span class="lp-product-side-count">3</span>
                  </div>
                  <div class="lp-product-side-item">
                    <span class="lp-product-side-glyph"></span>My issues
                  </div>
                  <div class="lp-product-side-item">
                    <span class="lp-product-side-glyph"></span>Active
                  </div>
                  <div class="lp-product-side-label">Cycles</div>
                  <div class="lp-product-side-item">Week 19</div>
                  <div class="lp-product-side-item">Week 20</div>
                </div>
                <div class="lp-product-main">
                  <div class="lp-product-toolbar">
                    <span class="lp-product-crumb">Active</span>
                    <span class="lp-product-count">17</span>
                    <div class="lp-product-toolbar-spacer"></div>
                    <span class="lp-product-tag">Grouped by status</span>
                  </div>
                  <div class="lp-product-grouphead">
                    <span class="lp-status-glyph lp-status-progress"></span>
                    <span>In progress</span>
                    <span class="lp-product-count">4</span>
                  </div>
                  <div class="lp-product-row">
                    <span class="lp-prio lp-prio-urgent"></span>
                    <span class="lp-product-id">NWND-281</span>
                    <span class="lp-product-title">Wire analytics funnel to the new pipeline</span>
                    <span class="lp-product-label">platform</span>
                    <span class="lp-product-avatar">RB</span>
                  </div>
                  <div class="lp-product-row">
                    <span class="lp-prio lp-prio-high"></span>
                    <span class="lp-product-id">NWND-280</span>
                    <span class="lp-product-title">Draft v0.4 release notes</span>
                    <span class="lp-product-label">docs</span>
                    <span class="lp-product-avatar">SL</span>
                  </div>
                  <div class="lp-product-row">
                    <span class="lp-prio lp-prio-medium"></span>
                    <span class="lp-product-id">NWND-276</span>
                    <span class="lp-product-title">Smoke-test the desktop installer</span>
                    <span class="lp-product-label">qa</span>
                    <span class="lp-product-avatar">OR</span>
                  </div>
                  <div class="lp-product-grouphead">
                    <span class="lp-status-glyph lp-status-todo"></span>
                    <span>Todo</span>
                    <span class="lp-product-count">6</span>
                  </div>
                  <div class="lp-product-row">
                    <span class="lp-prio lp-prio-high"></span>
                    <span class="lp-product-id">NWND-278</span>
                    <span class="lp-product-title">Cycle status report — week 19</span>
                    <span class="lp-product-label">ops</span>
                    <span class="lp-product-avatar">AP</span>
                  </div>
                  <div class="lp-product-row">
                    <span class="lp-prio lp-prio-medium"></span>
                    <span class="lp-product-id">NWND-277</span>
                    <span class="lp-product-title">Tighten focus order across settings tabs</span>
                    <span class="lp-product-label">a11y</span>
                    <span class="lp-product-avatar">SL</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="lp-product-floating">
              <span class="lp-kbd-floater">
                <Kbd>⌘</Kbd><Kbd>K</Kbd>
              </span>
              <span class="lp-product-tip">Press to open the palette</span>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section class="lp-logos" aria-label="Used by">
      <Container>
        <Stack gap={3} class="lp-logos-stack">
          <span class="lp-eyebrow lp-logos-eyebrow">Trusted by quiet teams at</span>
          <div class="lp-logos-row">
            {#each logos as l}
              <span class="lp-logo">{l}</span>
            {/each}
          </div>
        </Stack>
      </Container>
    </section>

    <section class="lp-features" id="features">
      <Container>
        <Stack gap={2} class="lp-features-head">
          <span class="lp-eyebrow">What's inside</span>
          <h2 class="lp-section-title">Built for the way calm teams actually work.</h2>
          <p class="lp-section-lead">
            Six choices — small, deliberate ones — that we'd argue make the difference between a
            workspace your team tolerates and one they trust.
          </p>
        </Stack>
        <div class="lp-feature-grid">
          {#each features as f, idx}
            <article class="lp-feature">
              <span class="lp-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  {#if f.icon === 'presence'}
                    <circle cx="12" cy="9" r="3.5"/>
                    <path d="M5 19c1-3.5 4-5 7-5s6 1.5 7 5"/>
                    <circle cx="18.5" cy="6.5" r="1.6" fill="currentColor" stroke="none"/>
                  {:else if f.icon === 'palette'}
                    <rect x="3.5" y="5" width="17" height="14" rx="2.5"/>
                    <path d="M7.5 9.5h9M7.5 13.5h5"/>
                  {:else if f.icon === 'source'}
                    <path d="M9 5l-5 7 5 7M15 5l5 7-5 7"/>
                  {:else if f.icon === 'log'}
                    <path d="M4.5 4.5h12l3.5 3.5v11h-15.5z"/>
                    <path d="M16 4.5v4h4M8 12h7M8 15h5"/>
                  {:else if f.icon === 'tokens'}
                    <circle cx="8" cy="8" r="3"/>
                    <circle cx="16" cy="8" r="3"/>
                    <circle cx="12" cy="16" r="3"/>
                  {:else if f.icon === 'quiet'}
                    <path d="M4 12h6l4-5v10l-4-5"/>
                    <path d="M16.5 9.5l3 5M19.5 9.5l-3 5" stroke-linecap="round"/>
                  {/if}
                </svg>
              </span>
              <h3 class="lp-feature-title">{f.title}</h3>
              <p class="lp-feature-body">{f.body}</p>
              <span class="lp-feature-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            </article>
          {/each}
        </div>
      </Container>
    </section>

    <section class="lp-system" id="system">
      <Container>
        <div class="lp-system-grid">
          <Stack gap={3} class="lp-system-text">
            <span class="lp-eyebrow">Design system</span>
            <h2 class="lp-section-title">One token system. Every surface.</h2>
            <p class="lp-section-lead">
              Northwind is built on @a3tai/mittsu — a Svelte 5 component kit with a single
              <code class="lp-code">--uin-*</code> token namespace. Hairline borders, restrained
              motion, accent earned not sprayed. Drop it into your app, theme by overriding tokens.
            </p>
            <ul class="lp-system-list">
              <li><span class="lp-tick" aria-hidden="true">✓</span> 80+ accessible Svelte 5 components</li>
              <li><span class="lp-tick" aria-hidden="true">✓</span> CSS custom properties, no Tailwind required</li>
              <li><span class="lp-tick" aria-hidden="true">✓</span> macOS-native voice, light + dark themes</li>
              <li><span class="lp-tick" aria-hidden="true">✓</span> Source copies into your repo via CLI</li>
            </ul>
            <HStack gap={2} class="lp-system-cta">
              <Button variant="outline" type="button">Browse the kit</Button>
              <Button variant="ghost" type="button">Theming guide →</Button>
            </HStack>
          </Stack>
          <div class="lp-tokens">
            <div class="lp-tokens-head">
              <span class="lp-tokens-head-dot"></span>
              <span class="lp-tokens-head-name">tokens.css</span>
            </div>
            <pre class="lp-tokens-code"><code><span class="lp-tk-cm">/* Materials flip with theme automatically */</span>
<span class="lp-tk-se">:root</span> {'{'}
  <span class="lp-tk-pr">--uin-accent</span>:     <span class="lp-tk-val">#3b6cf6</span>;
  <span class="lp-tk-pr">--uin-fg</span>:         <span class="lp-tk-val">#1c1d22</span>;
  <span class="lp-tk-pr">--uin-mat-window</span>: <span class="lp-tk-val">#fbfbfd</span>;
  <span class="lp-tk-pr">--uin-line</span>:       <span class="lp-tk-val">color-mix(in srgb, #1c1d22 12%, transparent)</span>;
  <span class="lp-tk-pr">--uin-r-md</span>:       <span class="lp-tk-val">8px</span>;
  <span class="lp-tk-pr">--uin-dur-1</span>:      <span class="lp-tk-val">120ms</span>;
{'}'}

<span class="lp-tk-se">[data-theme='dark']</span> {'{'}
  <span class="lp-tk-pr">--uin-fg</span>:         <span class="lp-tk-val">#ebebf0</span>;
  <span class="lp-tk-pr">--uin-mat-window</span>: <span class="lp-tk-val">#171719</span>;
{'}'}</code></pre>
          </div>
        </div>
      </Container>
    </section>

    <section class="lp-pricing" id="pricing">
      <Container>
        <Stack gap={3} class="lp-pricing-head">
          <span class="lp-eyebrow">Pricing</span>
          <h2 class="lp-section-title">Pay for seats, not surprises.</h2>
          <p class="lp-section-lead">Switch yearly to save two months. Demo numbers — wire your own backend.</p>
          <div class="lp-billing">
            <SegmentedControl options={billingOptions} bind:value={billing} size="sm" ariaLabel="Billing cycle" />
          </div>
        </Stack>
        <div class="lp-plan-grid">
          {#each plans as plan}
            <article class="lp-plan" class:lp-plan-primary={plan.primary}>
              <header class="lp-plan-head">
                <HStack justify="between" align="center">
                  <span class="lp-plan-name">{plan.name}</span>
                  {#if plan.primary}<Badge variant="accent">Most teams</Badge>{/if}
                </HStack>
                <p class="lp-plan-pitch">{plan.pitch}</p>
              </header>
              <div class="lp-plan-price">
                <span class="lp-plan-price-num">{priceLabel(plan)}</span>
                {#if plan.priceMonthly !== null && plan.priceMonthly > 0}
                  <span class="lp-plan-price-cadence">/ {plan.cadence} / {billing === 'yearly' ? 'mo, billed yearly' : 'mo'}</span>
                {:else if plan.priceMonthly === 0}
                  <span class="lp-plan-price-cadence">{plan.cadence}</span>
                {:else}
                  <span class="lp-plan-price-cadence">{plan.cadence}</span>
                {/if}
              </div>
              <Separator />
              <ul class="lp-plan-bullets">
                {#each plan.bullets as b}
                  <li><span class="lp-tick" aria-hidden="true">✓</span>{b}</li>
                {/each}
              </ul>
              <Button variant={plan.primary ? 'primary' : 'outline'} type="button" class="lp-plan-cta">{plan.cta}</Button>
            </article>
          {/each}
        </div>
      </Container>
    </section>

    <section class="lp-testimonial">
      <Container>
        <blockquote class="lp-quote">
          <p class="lp-quote-text">
            "It's the first internal tool that I actually want to leave open. Quiet, fast, and you
            can't accidentally make it look bad."
          </p>
          <footer class="lp-quote-foot">
            <span class="lp-quote-avatar" aria-hidden="true">AP</span>
            <span class="lp-quote-person">
              <span class="lp-quote-name">Anya Park</span>
              <span class="lp-quote-role">Staff engineer · Eastwind</span>
            </span>
          </footer>
        </blockquote>
      </Container>
    </section>

    <section class="lp-cta">
      <Container>
        <div class="lp-cta-card">
          <Stack gap={3} class="lp-cta-text">
            <span class="lp-eyebrow lp-cta-eyebrow">Ready when you are</span>
            <h2 class="lp-cta-title">Build a calmer workspace this week.</h2>
            <p class="lp-cta-lead">Two weeks free, no card. We'll send a short note in your inbox if you forget.</p>
          </Stack>
          <form class="lp-cta-form" onsubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@team.com" aria-label="Email" />
            <Button variant="primary" type="submit">Start trial</Button>
          </form>
        </div>
      </Container>
    </section>
  </main>

  <footer class="lp-footer">
    <Container>
      <div class="lp-footer-grid">
        <Stack gap={2} class="lp-footer-brand">
          <HStack gap={2} align="center">
            <span class="lp-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
            <span class="lp-word lp-footer-word">Northwind</span>
          </HStack>
          <span class="lp-footer-note">A workspace for product teams that prefer paragraphs to pings.</span>
        </Stack>
        <Stack gap={2}>
          <span class="lp-footer-label">Product</span>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#changelog">Changelog</a>
        </Stack>
        <Stack gap={2}>
          <span class="lp-footer-label">Studio</span>
          <a href="#about">About</a>
          <a href="#blog">Field notes</a>
          <a href="#careers">Careers</a>
        </Stack>
        <Stack gap={2}>
          <span class="lp-footer-label">Resources</span>
          <a href="#docs">Docs</a>
          <a href="#system">Design system</a>
          <a href="#status">Status</a>
        </Stack>
      </div>
      <Separator />
      <HStack justify="between" align="center" class="lp-footer-fine">
        <span>© 2026 Example org · Built with @a3tai/mittsu-svelte5</span>
        <HStack gap={3} class="lp-footer-fine-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#security">Security</a>
        </HStack>
      </HStack>
    </Container>
  </footer>
</div>

<style>
  .lp {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--uin-mat-window);
  }
  .lp-skip {
    position: absolute;
    left: -9999px;
  }
  .lp-skip:focus-visible {
    left: var(--uin-s-3);
    top: var(--uin-s-3);
    background: var(--uin-mat-window);
    padding: 4px 10px;
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-sm);
    z-index: 9;
  }

  /* Nav --------------------------------------------------------------- */
  .lp-nav {
    position: sticky;
    top: 0;
    z-index: 8;
    background: color-mix(in srgb, var(--uin-mat-window) 86%, transparent);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--uin-line);
  }
  :global(.lp-nav-row) {
    padding: var(--uin-s-3) 0;
  }
  :global(.lp-brand) {
    color: var(--uin-fg);
  }
  .lp-mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
    color: var(--uin-fg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .lp-word {
    font-family: var(--uin-font-display);
    font-size: 17px;
    letter-spacing: -0.018em;
    font-weight: 500;
  }
  :global(.lp-pill) {
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.02em;
  }
  .lp-nav-links {
    display: inline-flex;
    gap: var(--uin-s-4);
  }
  .lp-nav-links a {
    font-size: 13px;
    color: var(--uin-fg-mute);
    text-decoration: none;
    transition: color var(--uin-dur-1);
  }
  .lp-nav-links a:hover {
    color: var(--uin-fg);
  }

  /* Common section type ---------------------------------------------- */
  .lp-eyebrow {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .lp-section-title {
    font-family: var(--uin-font-display);
    font-size: clamp(28px, 3.6vw, 42px);
    line-height: 1.08;
    letter-spacing: -0.022em;
    color: var(--uin-fg);
    margin: 0;
    max-width: 22ch;
  }
  .lp-section-lead {
    font-size: 15px;
    line-height: 1.6;
    color: var(--uin-fg-mute);
    max-width: 60ch;
    margin: 0;
  }
  .lp-code {
    font-family: var(--uin-font-mono);
    font-size: 0.9em;
    padding: 1px 6px;
    border-radius: var(--uin-r-sm);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .lp-tick {
    display: inline-block;
    color: var(--uin-accent);
    margin-right: var(--uin-s-2);
    width: 14px;
  }

  /* Hero -------------------------------------------------------------- */
  .lp-hero {
    padding: var(--uin-s-8) 0 var(--uin-s-7);
    background:
      radial-gradient(ellipse at 80% 0%, color-mix(in srgb, var(--uin-accent) 8%, transparent), transparent 55%),
      radial-gradient(ellipse at 0% 100%, color-mix(in srgb, var(--uin-accent) 4%, transparent), transparent 50%),
      var(--uin-mat-window);
  }
  .lp-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: var(--uin-s-6);
    align-items: center;
  }
  :global(.lp-hero-text) {
    max-width: 540px;
  }
  :global(.lp-hero-eyebrow) {
    font-size: 12px;
    color: var(--uin-fg-mute);
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 4px 12px;
    width: fit-content;
  }
  .lp-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--uin-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--uin-accent) 30%, transparent);
  }
  .lp-hero-eyebrow-link {
    color: var(--uin-accent);
    text-decoration: none;
    margin-left: var(--uin-s-1);
  }
  .lp-headline {
    font-family: var(--uin-font-display);
    font-weight: 400;
    font-size: clamp(40px, 5.8vw, 64px);
    line-height: 1;
    letter-spacing: -0.028em;
    margin: 0;
    color: var(--uin-fg);
  }
  .lp-lead {
    font-size: 16px;
    line-height: 1.6;
    color: var(--uin-fg-mute);
    margin: 0;
    max-width: 500px;
  }
  :global(.lp-hero-cta) {
    flex-wrap: wrap;
  }
  .lp-cta-arrow {
    display: inline-block;
    margin-left: 6px;
  }
  :global(.lp-hero-trust) {
    margin-top: var(--uin-s-1);
    flex-wrap: wrap;
  }
  .lp-hero-trust-text {
    font-size: 12px;
    color: var(--uin-fg-dim);
  }

  /* Mock product window ---------------------------------------------- */
  .lp-product {
    position: relative;
    perspective: 1600px;
  }
  .lp-product-window {
    background: var(--uin-mat-window);
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-lg);
    overflow: hidden;
    box-shadow:
      0 30px 60px -40px color-mix(in srgb, var(--uin-fg) 40%, transparent),
      0 12px 24px -20px color-mix(in srgb, var(--uin-fg) 25%, transparent);
    transform: rotateY(-2deg) rotateX(2deg);
    transform-origin: 60% 40%;
  }
  .lp-product-titlebar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: var(--uin-mat-sidebar);
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-tl {
    width: 11px;
    height: 11px;
    border-radius: 999px;
    display: inline-block;
  }
  .lp-tl-red { background: #ff5f57; }
  .lp-tl-amber { background: #ffbd2e; }
  .lp-tl-green { background: #28c840; }
  .lp-product-titletext {
    margin-left: var(--uin-s-2);
    font-size: 11px;
    color: var(--uin-fg-dim);
  }
  .lp-product-body {
    display: grid;
    grid-template-columns: 140px 1fr;
    min-height: 360px;
  }
  .lp-product-side {
    background: var(--uin-mat-sidebar);
    border-right: 1px solid var(--uin-line);
    padding: var(--uin-s-2);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .lp-product-side-label {
    font-size: 10px;
    color: var(--uin-fg-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 10px 8px 4px;
    font-weight: 600;
  }
  .lp-product-side-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    font-size: 11.5px;
    color: var(--uin-fg-mute);
    border-radius: var(--uin-r-sm);
  }
  .lp-product-side-active {
    background: color-mix(in srgb, var(--uin-accent) 14%, transparent);
    color: var(--uin-fg);
  }
  .lp-product-side-glyph {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .lp-product-side-active .lp-product-side-glyph {
    background: var(--uin-accent);
    border-color: var(--uin-accent);
  }
  .lp-product-side-count {
    margin-left: auto;
    font-size: 10px;
    color: var(--uin-fg-dim);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 0 6px;
  }
  .lp-product-main {
    padding: 6px 0 0;
    background: var(--uin-mat-window);
  }
  .lp-product-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px var(--uin-s-3);
    font-size: 11.5px;
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-product-crumb { font-weight: 600; }
  .lp-product-count {
    font-variant-numeric: tabular-nums;
    color: var(--uin-fg-dim);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    padding: 0 7px;
    font-size: 10.5px;
  }
  .lp-product-toolbar-spacer { flex: 1; }
  .lp-product-tag {
    font-size: 10.5px;
    color: var(--uin-fg-dim);
  }
  .lp-product-grouphead {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px var(--uin-s-3) 6px;
    font-size: 11.5px;
    font-weight: 600;
    background: color-mix(in srgb, var(--uin-mat-window) 92%, transparent);
  }
  .lp-status-glyph {
    width: 11px;
    height: 11px;
    border-radius: 999px;
    border: 1.5px solid currentColor;
    display: inline-block;
    flex-shrink: 0;
  }
  .lp-status-progress { color: #d9a700; background: conic-gradient(currentColor 50%, transparent 50%); }
  .lp-status-todo { color: var(--uin-fg-mute); }
  .lp-product-row {
    display: grid;
    grid-template-columns: 14px 60px 1fr auto auto;
    align-items: center;
    gap: 8px;
    padding: 6px var(--uin-s-3);
    border-top: 1px solid var(--uin-line);
    font-size: 11.5px;
  }
  .lp-prio {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }
  .lp-prio-urgent { background: #e0594b; }
  .lp-prio-high { background: linear-gradient(180deg, #e4a23a, #e4a23a 60%, transparent 60%, transparent); }
  .lp-prio-medium { background: linear-gradient(180deg, #b6b6b6, #b6b6b6 35%, transparent 35%, transparent); }
  .lp-product-id {
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    color: var(--uin-fg-dim);
  }
  .lp-product-title {
    color: var(--uin-fg);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lp-product-label {
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 0 7px;
    font-size: 10px;
    color: var(--uin-fg-mute);
  }
  .lp-product-avatar {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--uin-accent) 70%, white), color-mix(in srgb, var(--uin-accent) 40%, black));
    color: var(--uin-accent-fg);
    font-size: 9.5px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
  }
  .lp-product-floating {
    position: absolute;
    bottom: -16px;
    left: -16px;
    background: var(--uin-mat-window);
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-md);
    padding: 8px 12px;
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    box-shadow: 0 10px 30px -16px color-mix(in srgb, var(--uin-fg) 30%, transparent);
  }
  .lp-kbd-floater {
    display: inline-flex;
    gap: 2px;
  }
  .lp-product-tip {
    font-size: 11.5px;
    color: var(--uin-fg-mute);
  }

  /* Logos ------------------------------------------------------------- */
  .lp-logos {
    padding: var(--uin-s-6) 0;
    border-top: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
  }
  :global(.lp-logos-stack) {
    align-items: center;
    text-align: center;
  }
  .lp-logos-eyebrow {
    color: var(--uin-fg-dim);
  }
  .lp-logos-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--uin-s-5) var(--uin-s-6);
  }
  .lp-logo {
    font-family: var(--uin-font-display);
    font-size: 14px;
    letter-spacing: 0.16em;
    color: var(--uin-fg-faint);
    transition: color var(--uin-dur-1);
  }
  .lp-logo:hover { color: var(--uin-fg-mute); }

  /* Features ---------------------------------------------------------- */
  .lp-features {
    padding: var(--uin-s-8) 0;
  }
  :global(.lp-features-head) {
    max-width: 760px;
    margin-bottom: var(--uin-s-6);
  }
  .lp-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid var(--uin-line);
    border-left: 1px solid var(--uin-line);
  }
  .lp-feature {
    position: relative;
    padding: var(--uin-s-5);
    border-right: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-2);
    min-height: 220px;
    transition: background-color var(--uin-dur-1);
  }
  .lp-feature:hover {
    background: var(--uin-mat-hover);
  }
  .lp-feature-icon {
    color: var(--uin-fg);
    display: inline-flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: var(--uin-r-sm);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .lp-feature-title {
    font-family: var(--uin-font-display);
    font-size: 19px;
    letter-spacing: -0.012em;
    margin: 0;
    line-height: 1.2;
  }
  .lp-feature-body {
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--uin-fg-mute);
    margin: 0;
    max-width: 36ch;
  }
  .lp-feature-num {
    position: absolute;
    top: var(--uin-s-4);
    right: var(--uin-s-4);
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    color: var(--uin-fg-faint);
    letter-spacing: 0.06em;
  }

  /* System / tokens --------------------------------------------------- */
  .lp-system {
    padding: var(--uin-s-8) 0;
    background: var(--uin-mat-sidebar);
    border-top: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-system-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: var(--uin-s-6);
    align-items: center;
  }
  :global(.lp-system-text) {
    max-width: 520px;
  }
  .lp-system-list {
    list-style: none;
    padding: 0;
    margin: var(--uin-s-2) 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-1);
    font-size: 14px;
    color: var(--uin-fg-mute);
  }
  :global(.lp-system-cta) {
    margin-top: var(--uin-s-2);
    flex-wrap: wrap;
  }
  .lp-tokens {
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-md);
    overflow: hidden;
    background: var(--uin-mat-window);
    box-shadow: 0 20px 40px -30px color-mix(in srgb, var(--uin-fg) 30%, transparent);
  }
  .lp-tokens-head {
    display: flex;
    align-items: center;
    gap: var(--uin-s-2);
    padding: 8px var(--uin-s-3);
    background: var(--uin-mat-sidebar);
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-tokens-head-dot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: var(--uin-accent);
  }
  .lp-tokens-head-name {
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-mute);
  }
  .lp-tokens-code {
    margin: 0;
    padding: var(--uin-s-4);
    font-family: var(--uin-font-mono);
    font-size: 12px;
    line-height: 1.7;
    color: var(--uin-fg);
    overflow-x: auto;
    white-space: pre;
  }
  .lp-tk-cm { color: var(--uin-fg-faint); font-style: italic; }
  .lp-tk-se { color: #b76b50; }
  .lp-tk-pr { color: var(--uin-accent); }
  .lp-tk-val { color: var(--uin-fg-mute); }
  :global([data-theme='dark']) .lp-tk-se { color: #e6997b; }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) .lp-tk-se { color: #e6997b; }
  }

  /* Pricing ----------------------------------------------------------- */
  .lp-pricing {
    padding: var(--uin-s-8) 0;
  }
  :global(.lp-pricing-head) {
    align-items: flex-start;
    margin-bottom: var(--uin-s-5);
    max-width: 760px;
  }
  .lp-billing {
    margin-top: var(--uin-s-1);
  }
  .lp-plan-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--uin-s-3);
  }
  .lp-plan {
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    padding: var(--uin-s-5);
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-3);
    background: var(--uin-mat-window);
    transition: border-color var(--uin-dur-1), transform var(--uin-dur-2);
  }
  .lp-plan:hover {
    border-color: var(--uin-line-strong);
  }
  .lp-plan-primary {
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--uin-accent) 6%, transparent), transparent 30%),
      var(--uin-mat-window);
    border-color: color-mix(in srgb, var(--uin-accent) 40%, var(--uin-line));
    box-shadow: 0 20px 50px -30px color-mix(in srgb, var(--uin-accent) 30%, transparent);
  }
  .lp-plan-name {
    font-family: var(--uin-font-display);
    font-size: 22px;
    letter-spacing: -0.014em;
  }
  .lp-plan-pitch {
    font-size: 13px;
    color: var(--uin-fg-mute);
    margin: 0;
    line-height: 1.5;
  }
  .lp-plan-price {
    display: flex;
    align-items: baseline;
    gap: var(--uin-s-1);
  }
  .lp-plan-price-num {
    font-family: var(--uin-font-display);
    font-size: 44px;
    letter-spacing: -0.022em;
    line-height: 1;
    color: var(--uin-fg);
  }
  .lp-plan-price-cadence {
    font-size: 12px;
    color: var(--uin-fg-dim);
  }
  .lp-plan-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-1);
    font-size: 13.5px;
    color: var(--uin-fg-mute);
    flex: 1;
  }
  :global(.lp-plan-cta) {
    width: 100%;
  }

  /* Testimonial ------------------------------------------------------- */
  .lp-testimonial {
    padding: var(--uin-s-7) 0;
    border-top: 1px solid var(--uin-line);
  }
  .lp-quote {
    max-width: 720px;
    margin: 0 auto;
    padding: 0;
  }
  .lp-quote-text {
    font-family: var(--uin-font-display);
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.3;
    letter-spacing: -0.018em;
    color: var(--uin-fg);
    margin: 0 0 var(--uin-s-3);
  }
  .lp-quote-foot {
    display: flex;
    align-items: center;
    gap: var(--uin-s-2);
  }
  .lp-quote-person {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .lp-quote-avatar {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--uin-accent) 80%, white), color-mix(in srgb, var(--uin-accent) 40%, black));
    color: var(--uin-accent-fg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .lp-quote-name {
    font-size: 13.5px;
    font-weight: 600;
  }
  .lp-quote-role {
    font-size: 12px;
    color: var(--uin-fg-mute);
  }

  /* Final CTA -------------------------------------------------------- */
  .lp-cta {
    padding: var(--uin-s-7) 0 var(--uin-s-8);
  }
  .lp-cta-card {
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-lg);
    padding: var(--uin-s-6);
    background:
      radial-gradient(ellipse at top right, color-mix(in srgb, var(--uin-accent) 15%, transparent), transparent 60%),
      var(--uin-mat-window);
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: var(--uin-s-5);
    align-items: center;
  }
  :global(.lp-cta-text) {
    max-width: 480px;
  }
  .lp-cta-eyebrow {
    color: var(--uin-accent);
  }
  .lp-cta-title {
    font-family: var(--uin-font-display);
    font-size: clamp(26px, 3.4vw, 36px);
    letter-spacing: -0.022em;
    line-height: 1.1;
    margin: 0;
  }
  .lp-cta-lead {
    font-size: 14px;
    color: var(--uin-fg-mute);
    line-height: 1.55;
    margin: 0;
  }
  .lp-cta-form {
    display: flex;
    gap: var(--uin-s-2);
  }
  .lp-cta-form input {
    flex: 1;
    appearance: none;
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-window);
    border-radius: var(--uin-r-sm);
    padding: 8px 12px;
    font: inherit;
    font-size: 14px;
    color: var(--uin-fg);
  }
  .lp-cta-form input:focus-visible {
    outline: none;
    box-shadow: var(--uin-focus-ring);
  }

  /* Footer ------------------------------------------------------------ */
  .lp-footer {
    margin-top: auto;
    padding: var(--uin-s-7) 0 var(--uin-s-4);
    background: var(--uin-mat-sidebar);
    border-top: 1px solid var(--uin-line);
  }
  .lp-footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: var(--uin-s-5);
    margin-bottom: var(--uin-s-4);
  }
  :global(.lp-footer-brand) {
    max-width: 360px;
  }
  .lp-footer-word {
    font-size: 14px;
  }
  .lp-footer-note {
    font-size: 12.5px;
    color: var(--uin-fg-mute);
    line-height: 1.55;
  }
  .lp-footer-label {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .lp-footer a {
    color: var(--uin-fg-mute);
    text-decoration: none;
    font-size: 13px;
    transition: color var(--uin-dur-1);
  }
  .lp-footer a:hover {
    color: var(--uin-fg);
  }
  :global(.lp-footer-fine) {
    padding-top: var(--uin-s-3);
    font-size: 11.5px;
    color: var(--uin-fg-dim);
    flex-wrap: wrap;
  }
  :global(.lp-footer-fine-links) a {
    font-size: 11.5px;
    color: var(--uin-fg-dim);
  }

  /* Responsive -------------------------------------------------------- */
  @media (max-width: 1080px) {
    .lp-hero-grid {
      grid-template-columns: 1fr;
    }
    .lp-product-window {
      transform: none;
    }
    .lp-product-floating {
      left: 50%;
      transform: translateX(-50%);
    }
    .lp-system-grid {
      grid-template-columns: 1fr;
    }
    .lp-feature-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .lp-plan-grid {
      grid-template-columns: 1fr;
    }
    .lp-cta-card {
      grid-template-columns: 1fr;
    }
    .lp-nav-links {
      display: none;
    }
  }
  @media (max-width: 720px) {
    .lp-feature-grid {
      grid-template-columns: 1fr;
    }
    .lp-footer-grid {
      grid-template-columns: 1fr 1fr;
    }
    .lp-product-body {
      grid-template-columns: 1fr;
    }
    .lp-product-side {
      display: none;
    }
  }
</style>
