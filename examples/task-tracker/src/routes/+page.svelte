<script lang="ts">
  import Sidebar from '@a3tai/mittsu-svelte5/components/sidebar/sidebar.svelte';
  import NavItem from '@a3tai/mittsu-svelte5/components/nav-item/nav-item.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Typography from '@a3tai/mittsu-svelte5/components/typography/typography.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import Chip from '@a3tai/mittsu-svelte5/components/chip/chip.svelte';
  import Avatar from '@a3tai/mittsu-svelte5/components/avatar/avatar.svelte';
  import SegmentedControl from '@a3tai/mittsu-svelte5/components/segmented-control/segmented-control.svelte';
  import Separator from '@a3tai/mittsu-svelte5/components/separator/separator.svelte';
  import HStack from '@a3tai/mittsu-svelte5/components/hstack/hstack.svelte';
  import Spacer from '@a3tai/mittsu-svelte5/components/spacer/spacer.svelte';
  import Kbd from '@a3tai/mittsu-svelte5/components/kbd/kbd.svelte';
  import SearchInput from '@a3tai/mittsu-svelte5/components/search-input/search-input.svelte';

  type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
  type Status = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled';

  type Issue = {
    id: string;
    title: string;
    priority: Priority;
    status: Status;
    labels: {name: string; tone: 'blue' | 'mint' | 'amber' | 'rose' | 'plum' | 'slate'}[];
    assignee: {name: string; initials: string};
    updated: string;
    project?: string;
  };

  const PROJECT = 'NWND';
  const issues: Issue[] = [
    {id: '281', title: 'Wire analytics funnel to the new pipeline', priority: 'urgent', status: 'in_progress', labels: [{name: 'platform', tone: 'blue'}, {name: 'metrics', tone: 'mint'}], assignee: {name: 'Riya Banerjee', initials: 'RB'}, updated: '12m', project: 'Platform Q3'},
    {id: '280', title: 'Draft v0.4 release notes', priority: 'high', status: 'in_progress', labels: [{name: 'docs', tone: 'plum'}], assignee: {name: 'Sam Liu', initials: 'SL'}, updated: '1h', project: 'Docs'},
    {id: '276', title: 'Smoke-test the desktop installer on Ventura + Sonoma', priority: 'medium', status: 'in_progress', labels: [{name: 'qa', tone: 'amber'}, {name: 'desktop', tone: 'slate'}], assignee: {name: 'Otis Reyes', initials: 'OR'}, updated: '3h'},
    {id: '274', title: 'Polish empty states in the inbox view', priority: 'low', status: 'in_progress', labels: [{name: 'design', tone: 'rose'}], assignee: {name: 'Mei Sato', initials: 'MS'}, updated: '5h', project: 'Inbox refresh'},

    {id: '278', title: 'Cycle status report — week 19', priority: 'high', status: 'todo', labels: [{name: 'ops', tone: 'slate'}], assignee: {name: 'Anya Park', initials: 'AP'}, updated: '2h'},
    {id: '277', title: 'Tighten focus order across the settings tabs', priority: 'medium', status: 'todo', labels: [{name: 'a11y', tone: 'mint'}], assignee: {name: 'Sam Liu', initials: 'SL'}, updated: '4h'},
    {id: '275', title: 'Audit dependency bumps from last sprint', priority: 'medium', status: 'todo', labels: [{name: 'security', tone: 'amber'}], assignee: {name: 'Riya Banerjee', initials: 'RB'}, updated: '8h'},
    {id: '273', title: 'Add presence lamps to the workspace switcher', priority: 'low', status: 'todo', labels: [{name: 'design', tone: 'rose'}, {name: 'realtime', tone: 'blue'}], assignee: {name: 'Mei Sato', initials: 'MS'}, updated: '1d', project: 'Inbox refresh'},
    {id: '272', title: 'File weekly metrics digest', priority: 'low', status: 'todo', labels: [{name: 'metrics', tone: 'mint'}], assignee: {name: 'Otis Reyes', initials: 'OR'}, updated: '1d'},

    {id: '269', title: 'Investigate flakey snapshot tests on CI', priority: 'urgent', status: 'in_review', labels: [{name: 'ci', tone: 'amber'}, {name: 'tests', tone: 'slate'}], assignee: {name: 'Anya Park', initials: 'AP'}, updated: '40m'},
    {id: '268', title: 'Restore keyboard shortcuts on the editor panel', priority: 'high', status: 'in_review', labels: [{name: 'editor', tone: 'blue'}], assignee: {name: 'Sam Liu', initials: 'SL'}, updated: '6h'},

    {id: '265', title: 'Refactor toolbar density helpers', priority: 'medium', status: 'backlog', labels: [{name: 'ui-kit', tone: 'plum'}], assignee: {name: 'Mei Sato', initials: 'MS'}, updated: '2d'},
    {id: '264', title: 'Promote command palette to the marketing site', priority: 'low', status: 'backlog', labels: [{name: 'marketing', tone: 'rose'}], assignee: {name: 'Riya Banerjee', initials: 'RB'}, updated: '2d'},
    {id: '263', title: 'Backfill audit log for SSO admins', priority: 'medium', status: 'backlog', labels: [{name: 'security', tone: 'amber'}, {name: 'enterprise', tone: 'slate'}], assignee: {name: 'Anya Park', initials: 'AP'}, updated: '3d'},
    {id: '262', title: 'Add changelog entry generator', priority: 'low', status: 'backlog', labels: [{name: 'docs', tone: 'plum'}], assignee: {name: 'Otis Reyes', initials: 'OR'}, updated: '4d'},
    {id: '261', title: 'Plan migration off the legacy avatar service', priority: 'none', status: 'backlog', labels: [{name: 'platform', tone: 'blue'}], assignee: {name: 'Sam Liu', initials: 'SL'}, updated: '4d'},
  ];

  const STATUS_ORDER: Status[] = ['in_progress', 'todo', 'in_review', 'backlog'];
  const STATUS_LABEL: Record<Status, string> = {
    backlog: 'Backlog',
    todo: 'Todo',
    in_progress: 'In progress',
    in_review: 'In review',
    done: 'Done',
    cancelled: 'Cancelled',
  };

  let activeView = $state<'active' | 'mine' | 'inbox' | 'backlog' | 'triage' | 'all'>('active');
  let groupBy = $state<'status' | 'priority' | 'assignee'>('status');
  let layout = $state<'list' | 'board'>('list');
  let query = $state('');

  let filters = $state({
    priority: {urgent: true, high: true, medium: true, low: true, none: true},
    assignees: new Set<string>(),
  });

  const layoutOptions = [
    {value: 'list' as const, label: 'List'},
    {value: 'board' as const, label: 'Board'},
  ];

  const grouped = $derived.by(() => {
    const filtered = issues.filter((i) => {
      if (!filters.priority[i.priority]) return false;
      if (query && !`${PROJECT}-${i.id} ${i.title}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    return STATUS_ORDER.map((s) => ({status: s, rows: filtered.filter((i) => i.status === s)}));
  });

  const totalShown = $derived(grouped.reduce((n, g) => n + g.rows.length, 0));

  function togglePriority(p: Priority) {
    filters.priority[p] = !filters.priority[p];
  }
</script>

<div class="lt-shell">
  <div class="lt-shell-side">
    <Sidebar class="lt-side" width="100%">
      {#snippet header()}
        <button type="button" class="lt-workspace">
          <span class="lt-workspace-mark" aria-hidden="true">N</span>
          <span class="lt-workspace-text">
            <span class="lt-workspace-name">Northwind</span>
            <span class="lt-workspace-tier">Pro · 28 members</span>
          </span>
          <span class="lt-workspace-chev" aria-hidden="true">⌃⌄</span>
        </button>
      {/snippet}

      <div class="lt-side-body">
        <div class="lt-side-section">
          <NavItem active={activeView === 'inbox'} type="button" onclick={() => (activeView = 'inbox')}>
            <span class="lt-nav-row">
              <span class="lt-nav-glyph">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 4l6 4 6-4" /><rect x="2" y="3.5" width="12" height="9" rx="2" />
                </svg>
              </span>
              <span>Inbox</span>
              <span class="lt-nav-count">3</span>
            </span>
          </NavItem>
          <NavItem active={activeView === 'mine'} type="button" onclick={() => (activeView = 'mine')}>
            <span class="lt-nav-row">
              <span class="lt-nav-glyph">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="8" cy="5.5" r="2.5" /><path d="M3 13.5c.6-2.4 2.6-4 5-4s4.4 1.6 5 4" />
                </svg>
              </span>
              <span>My issues</span>
              <span class="lt-nav-count">7</span>
            </span>
          </NavItem>
        </div>

        <div class="lt-side-section">
          <div class="lt-side-label">Workspace</div>
          <NavItem active={activeView === 'active'} type="button" onclick={() => (activeView = 'active')}>
            <span class="lt-nav-row">
              <span class="lt-nav-glyph">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5" /><path d="M8 4.5v3.5l2 2" stroke-linecap="round" />
                </svg>
              </span>
              <span>Active</span>
              <span class="lt-nav-count">{totalShown}</span>
            </span>
          </NavItem>
          <NavItem active={activeView === 'all'} type="button" onclick={() => (activeView = 'all')}>
            <span class="lt-nav-row">
              <span class="lt-nav-glyph">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
                  <path d="M3 4.5h10M3 8h10M3 11.5h10" />
                </svg>
              </span>
              <span>All issues</span>
            </span>
          </NavItem>
          <NavItem active={activeView === 'backlog'} type="button" onclick={() => (activeView = 'backlog')}>
            <span class="lt-nav-row">
              <span class="lt-nav-glyph">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5" />
                </svg>
              </span>
              <span>Backlog</span>
            </span>
          </NavItem>
          <NavItem active={activeView === 'triage'} type="button" onclick={() => (activeView = 'triage')}>
            <span class="lt-nav-row">
              <span class="lt-nav-glyph">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M2.5 5l5.5 6 5.5-6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>Triage</span>
              <span class="lt-nav-count lt-nav-count-warn">12</span>
            </span>
          </NavItem>
        </div>

        <div class="lt-side-section">
          <div class="lt-side-label">Teams</div>
          <NavItem type="button">
            <span class="lt-nav-row">
              <span class="lt-team-dot" style="--dot:#7aa6ff" aria-hidden="true"></span>
              <span>Engineering</span>
            </span>
          </NavItem>
          <NavItem type="button">
            <span class="lt-nav-row">
              <span class="lt-team-dot" style="--dot:#f0a672" aria-hidden="true"></span>
              <span>Design</span>
            </span>
          </NavItem>
          <NavItem type="button">
            <span class="lt-nav-row">
              <span class="lt-team-dot" style="--dot:#9ed1a8" aria-hidden="true"></span>
              <span>Growth</span>
            </span>
          </NavItem>
        </div>

        <div class="lt-side-section">
          <div class="lt-side-label">Views</div>
          <NavItem type="button">
            <span class="lt-nav-row"><span class="lt-view-mark" aria-hidden="true"></span><span>Shipping this week</span></span>
          </NavItem>
          <NavItem type="button">
            <span class="lt-nav-row"><span class="lt-view-mark" aria-hidden="true"></span><span>Customer-reported</span></span>
          </NavItem>
          <NavItem type="button">
            <span class="lt-nav-row"><span class="lt-view-mark" aria-hidden="true"></span><span>Needs a11y review</span></span>
          </NavItem>
        </div>
      </div>

      {#snippet footer()}
        <div class="lt-side-footer">
          <Avatar size="sm" name="Riya B" initials="RB" />
          <span class="lt-side-footer-text">
            <span class="lt-side-footer-name">Riya Banerjee</span>
            <span class="lt-side-footer-meta">Online · Engineering</span>
          </span>
        </div>
      {/snippet}
    </Sidebar>
  </div>

  <div class="lt-shell-main">
    <header class="lt-topbar">
      <HStack gap={3} align="center" class="lt-topbar-row">
        <HStack gap={2} align="center" class="lt-crumbs">
          <span class="lt-crumb-team">Northwind</span>
          <span class="lt-crumb-sep">/</span>
          <span class="lt-crumb-team">Engineering</span>
          <span class="lt-crumb-sep">/</span>
          <span class="lt-crumb-view">Active</span>
          <Badge variant="outline" class="lt-count-pill">{totalShown}</Badge>
        </HStack>
        <Spacer />
        <SearchInput
          placeholder="Search issues…"
          bind:value={query}
          class="lt-search"
        />
        <HStack gap={1} align="center" class="lt-shortcut">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </HStack>
        <Button variant="primary" size="sm" type="button" class="lt-new">
          <span class="lt-plus" aria-hidden="true">+</span>
          New issue
        </Button>
      </HStack>
    </header>

    <div class="lt-filterbar">
      <HStack gap={2} align="center" class="lt-filterbar-row">
        <span class="lt-filterbar-label">Filters</span>
        <Chip active={filters.priority.urgent} onClick={() => togglePriority('urgent')} count={issues.filter((i) => i.priority === 'urgent' && filters.priority.urgent).length}>
          <span class="lt-chip-prio"><span class="lt-prio-glyph lt-prio-urgent" aria-hidden="true"></span>Urgent</span>
        </Chip>
        <Chip active={filters.priority.high} onClick={() => togglePriority('high')} count={issues.filter((i) => i.priority === 'high').length}>
          <span class="lt-chip-prio"><span class="lt-prio-glyph lt-prio-high" aria-hidden="true"></span>High</span>
        </Chip>
        <Chip active={filters.priority.medium} onClick={() => togglePriority('medium')} count={issues.filter((i) => i.priority === 'medium').length}>
          <span class="lt-chip-prio"><span class="lt-prio-glyph lt-prio-medium" aria-hidden="true"></span>Medium</span>
        </Chip>
        <Chip active={filters.priority.low} onClick={() => togglePriority('low')} count={issues.filter((i) => i.priority === 'low').length}>
          <span class="lt-chip-prio"><span class="lt-prio-glyph lt-prio-low" aria-hidden="true"></span>Low</span>
        </Chip>
        <span class="lt-filterbar-divider" aria-hidden="true"></span>
        <button type="button" class="lt-filterbar-add">+ Filter</button>
        <Spacer />
        <span class="lt-filterbar-meta">Grouped by</span>
        <select bind:value={groupBy} class="lt-bare-select" aria-label="Group by">
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="assignee">Assignee</option>
        </select>
        <SegmentedControl options={layoutOptions} bind:value={layout} size="sm" ariaLabel="Layout" />
      </HStack>
    </div>

    <div class="lt-scroll">
      <div class="lt-list" role="list">
        {#each grouped as group (group.status)}
          {#if group.rows.length > 0}
            <div class="lt-group">
              <div class="lt-group-head">
                <div class="lt-group-head-left">
                  <span class="lt-status-icon" data-status={group.status}>
                    {#if group.status === 'in_progress'}
                      <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5" />
                        <path d="M7 2 a5 5 0 0 1 0 10 Z" fill="currentColor" opacity="0.55"/>
                      </svg>
                    {:else if group.status === 'in_review'}
                      <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5" />
                        <circle cx="7" cy="7" r="2.6" fill="currentColor" />
                      </svg>
                    {:else if group.status === 'todo'}
                      <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5" />
                      </svg>
                    {:else if group.status === 'backlog'}
                      <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" />
                      </svg>
                    {:else if group.status === 'done'}
                      <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" fill="currentColor" />
                        <path d="M4.4 7.2l1.8 1.8 3.5-3.7" fill="none" stroke="var(--uin-mat-window)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    {/if}
                  </span>
                  <span class="lt-group-name">{STATUS_LABEL[group.status]}</span>
                  <span class="lt-group-count">{group.rows.length}</span>
                </div>
                <div class="lt-group-head-right">
                  <button type="button" class="lt-group-action" aria-label="Add issue to {STATUS_LABEL[group.status]}">+</button>
                </div>
              </div>

              <ul class="lt-rows" role="list">
                {#each group.rows as iss (iss.id)}
                  <li class="lt-row" role="listitem">
                    <button type="button" class="lt-row-btn">
                      <span class="lt-row-prio">
                        {#if iss.priority === 'urgent'}
                          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                            <rect x="1.5" y="1.5" width="11" height="11" rx="2.5" fill="var(--lt-urgent)"/>
                            <rect x="6.25" y="3.5" width="1.5" height="5" rx="0.7" fill="white"/>
                            <rect x="6.25" y="9.5" width="1.5" height="1.5" rx="0.7" fill="white"/>
                          </svg>
                        {:else if iss.priority === 'high'}
                          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                            <rect x="1" y="9" width="3" height="4" rx="0.8" fill="currentColor"/>
                            <rect x="5.5" y="6" width="3" height="7" rx="0.8" fill="currentColor"/>
                            <rect x="10" y="3" width="3" height="10" rx="0.8" fill="currentColor"/>
                          </svg>
                        {:else if iss.priority === 'medium'}
                          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                            <rect x="1" y="9" width="3" height="4" rx="0.8" fill="currentColor"/>
                            <rect x="5.5" y="6" width="3" height="7" rx="0.8" fill="currentColor"/>
                            <rect x="10" y="3" width="3" height="10" rx="0.8" fill="currentColor" opacity="0.3"/>
                          </svg>
                        {:else if iss.priority === 'low'}
                          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                            <rect x="1" y="9" width="3" height="4" rx="0.8" fill="currentColor"/>
                            <rect x="5.5" y="6" width="3" height="7" rx="0.8" fill="currentColor" opacity="0.3"/>
                            <rect x="10" y="3" width="3" height="10" rx="0.8" fill="currentColor" opacity="0.3"/>
                          </svg>
                        {:else}
                          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                            <line x1="2.5" y1="7" x2="11.5" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                          </svg>
                        {/if}
                      </span>
                      <span class="lt-row-id">{PROJECT}-{iss.id}</span>
                      <span class="lt-row-title">{iss.title}</span>
                      <span class="lt-row-labels">
                        {#each iss.labels as l}
                          <span class="lt-label" data-tone={l.tone}>
                            <span class="lt-label-dot" aria-hidden="true"></span>
                            {l.name}
                          </span>
                        {/each}
                      </span>
                      {#if iss.project}
                        <span class="lt-row-project">{iss.project}</span>
                      {/if}
                      <span class="lt-row-updated">{iss.updated}</span>
                      <span class="lt-row-assignee">
                        <Avatar size="xs" name={iss.assignee.name} initials={iss.assignee.initials} />
                      </span>
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        {/each}

        {#if totalShown === 0}
          <div class="lt-empty">
            <Typography variant="h4">Nothing matches your filters.</Typography>
            <Typography variant="caption" tone="muted">Re-enable a priority or clear the search to see issues again.</Typography>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Shell ------------------------------------------------------------- */
  .lt-shell {
    display: grid;
    grid-template-columns: 248px 1fr;
    height: 100vh;
    width: 100%;
    background: var(--uin-mat-window);
    color: var(--uin-fg);
    overflow: hidden;
  }
  .lt-shell-side {
    height: 100vh;
    overflow: hidden;
    border-right: 1px solid var(--uin-line);
    background: var(--uin-mat-sidebar);
    display: flex;
    flex-direction: column;
  }
  .lt-shell-side :global(.uin-sidebar) {
    height: 100%;
    border-right: 0;
  }
  .lt-shell-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background: var(--uin-mat-window);
  }

  /* Topbar ------------------------------------------------------------ */
  .lt-topbar {
    height: 44px;
    flex: 0 0 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--uin-line);
    background: color-mix(in srgb, var(--uin-mat-window) 88%, transparent);
    backdrop-filter: blur(14px);
    padding: 0 var(--uin-s-3);
  }
  :global(.lt-topbar-row) {
    width: 100%;
  }
  :global(.lt-crumbs) {
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    letter-spacing: -0.005em;
  }
  .lt-crumb-team {
    color: var(--uin-fg-mute);
  }
  .lt-crumb-view {
    color: var(--uin-fg);
    font-weight: 600;
  }
  .lt-crumb-sep {
    color: var(--uin-fg-faint);
  }
  :global(.lt-count-pill) {
    margin-left: var(--uin-s-1);
    font-variant-numeric: tabular-nums;
  }
  :global(.lt-search) {
    width: 220px;
  }
  :global(.lt-shortcut) {
    color: var(--uin-fg-faint);
  }
  .lt-plus {
    display: inline-block;
    margin-right: 4px;
    font-weight: 600;
    transform: translateY(-0.5px);
  }

  /* Sidebar ----------------------------------------------------------- */
  :global(.lt-side) {
    background: var(--uin-mat-sidebar);
  }
  :global(.lt-side .uin-nav-item:has(> .uin-nav-item-dot:empty)) {
    grid-template-columns: 1fr;
  }
  :global(.lt-side .uin-nav-item:has(> .uin-nav-item-dot:empty) > .uin-nav-item-dot) {
    display: none;
  }
  .lt-workspace {
    appearance: none;
    background: transparent;
    border: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 26px 1fr auto;
    gap: var(--uin-s-2);
    align-items: center;
    padding: var(--uin-s-2) var(--uin-s-3);
    border-radius: var(--uin-r-sm);
    color: inherit;
    cursor: pointer;
    transition: background-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .lt-workspace:hover {
    background: var(--uin-mat-hover);
  }
  .lt-workspace-mark {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: linear-gradient(140deg, color-mix(in srgb, var(--uin-accent) 92%, white), color-mix(in srgb, var(--uin-accent) 65%, black));
    color: var(--uin-accent-fg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--uin-font-display);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.02em;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, white 22%, transparent);
  }
  .lt-workspace-text {
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: 1.15;
  }
  .lt-workspace-name {
    font-weight: 600;
    font-size: 13px;
  }
  .lt-workspace-tier {
    font-size: 11px;
    color: var(--uin-fg-dim);
  }
  .lt-workspace-chev {
    color: var(--uin-fg-faint);
    font-size: 9px;
    letter-spacing: -2px;
  }

  .lt-side-body {
    display: flex;
    flex-direction: column;
    padding: var(--uin-s-2);
  }
  .lt-side-section {
    padding: var(--uin-s-1) 0;
  }
  .lt-side-section + .lt-side-section {
    margin-top: var(--uin-s-2);
  }
  .lt-side-label {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--uin-fg-dim);
    padding: var(--uin-s-2) var(--uin-s-2) var(--uin-s-1);
  }
  .lt-nav-row {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    width: 100%;
  }
  .lt-nav-glyph {
    color: var(--uin-fg-mute);
    display: inline-flex;
  }
  .lt-nav-count {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    font-size: 11px;
    color: var(--uin-fg-dim);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    padding: 1px 7px;
    line-height: 1.4;
  }
  .lt-nav-count-warn {
    color: var(--uin-warn, #b45c1a);
    border-color: color-mix(in srgb, var(--uin-warn, #b45c1a) 35%, var(--uin-line));
    background: color-mix(in srgb, var(--uin-warn, #b45c1a) 10%, transparent);
  }
  .lt-team-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--dot, var(--uin-accent));
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--dot, var(--uin-accent)) 40%, transparent);
  }
  .lt-view-mark {
    width: 12px;
    height: 12px;
    border: 1.5px solid var(--uin-fg-faint);
    border-radius: 3px;
    display: inline-block;
  }
  .lt-side-footer {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: var(--uin-s-2);
    align-items: center;
    padding: var(--uin-s-2) var(--uin-s-3);
  }
  .lt-side-footer-text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }
  .lt-side-footer-name {
    font-size: 12.5px;
    font-weight: 500;
  }
  .lt-side-footer-meta {
    font-size: 11px;
    color: var(--uin-fg-dim);
  }

  /* Filter bar -------------------------------------------------------- */
  .lt-filterbar {
    flex: 0 0 auto;
    border-bottom: 1px solid var(--uin-line);
    padding: var(--uin-s-2) var(--uin-s-4);
    background: var(--uin-mat-window);
    color: var(--uin-fg);
  }
  :global(.lt-filterbar-row) {
    flex-wrap: wrap;
    gap: var(--uin-s-2);
  }
  .lt-filterbar-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
    color: var(--uin-fg-dim);
    margin-right: var(--uin-s-1);
  }
  .lt-filterbar-divider {
    width: 1px;
    height: 14px;
    background: var(--uin-line);
    margin: 0 var(--uin-s-1);
  }
  .lt-filterbar-add {
    appearance: none;
    background: transparent;
    border: 1px dashed var(--uin-line-strong);
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 12px;
    color: var(--uin-fg-mute);
    cursor: pointer;
    transition: color var(--uin-dur-1), border-color var(--uin-dur-1);
  }
  .lt-filterbar-add:hover {
    color: var(--uin-fg);
    border-color: var(--uin-fg-mute);
  }
  .lt-filterbar-meta {
    font-size: 11.5px;
    color: var(--uin-fg-dim);
  }
  .lt-bare-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--uin-mat-row);
    background-image: linear-gradient(45deg, transparent 50%, var(--uin-fg-mute) 50%), linear-gradient(135deg, var(--uin-fg-mute) 50%, transparent 50%);
    background-position: calc(100% - 8px) 50%, calc(100% - 4px) 50%;
    background-size: 4px 4px;
    background-repeat: no-repeat;
    border: 1px solid var(--uin-line);
    color: var(--uin-fg);
    font: inherit;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 18px 3px 8px;
    border-radius: var(--uin-r-sm);
    cursor: pointer;
    color-scheme: light dark;
  }
  .lt-bare-select:hover {
    background-color: var(--uin-mat-hover);
    border-color: var(--uin-line-strong);
  }
  .lt-bare-select:focus-visible {
    outline: none;
    box-shadow: var(--uin-focus-ring);
    border-color: transparent;
  }
  .lt-bare-select option {
    background-color: var(--uin-mat-window);
    color: var(--uin-fg);
  }
  .lt-chip-prio {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .lt-prio-glyph {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    display: inline-block;
  }
  .lt-prio-urgent {
    background: var(--lt-urgent);
  }
  .lt-prio-high {
    background: var(--lt-high);
  }
  .lt-prio-medium {
    background: linear-gradient(180deg, var(--lt-medium), color-mix(in srgb, var(--lt-medium) 40%, transparent));
  }
  .lt-prio-low {
    background: color-mix(in srgb, var(--lt-low) 60%, transparent);
  }

  /* List -------------------------------------------------------------- */
  .lt-scroll {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--uin-fg) 18%, transparent) transparent;
  }
  .lt-scroll::-webkit-scrollbar { width: 10px; }
  .lt-scroll::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 999px;
    background-color: color-mix(in srgb, var(--uin-fg) 18%, transparent);
  }
  .lt-list {
    padding: 0 0 var(--uin-s-6);
  }
  .lt-group + .lt-group {
    margin-top: var(--uin-s-1);
  }
  .lt-group-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--uin-s-3) var(--uin-s-4) var(--uin-s-2);
    position: sticky;
    top: 0;
    background: color-mix(in srgb, var(--uin-mat-window) 92%, transparent);
    backdrop-filter: blur(8px);
    z-index: 1;
  }
  .lt-group-head-left {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
  }
  .lt-status-icon {
    display: inline-flex;
    width: 14px;
    height: 14px;
  }
  .lt-status-icon[data-status='in_progress'] { color: #d9a700; }
  .lt-status-icon[data-status='in_review']   { color: #6c4cf3; }
  .lt-status-icon[data-status='todo']        { color: var(--uin-fg-mute); }
  .lt-status-icon[data-status='backlog']     { color: var(--uin-fg-faint); }
  .lt-status-icon[data-status='done']        { color: #4e9d56; }
  .lt-group-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.005em;
  }
  .lt-group-count {
    font-size: 12px;
    color: var(--uin-fg-dim);
    font-variant-numeric: tabular-nums;
  }
  .lt-group-action {
    appearance: none;
    background: transparent;
    border: 0;
    color: var(--uin-fg-dim);
    width: 22px;
    height: 22px;
    border-radius: var(--uin-r-sm);
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    transition: background-color var(--uin-dur-1), color var(--uin-dur-1);
  }
  .lt-group-action:hover {
    background: var(--uin-mat-hover);
    color: var(--uin-fg);
  }

  .lt-rows {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .lt-row {
    border-top: 1px solid var(--uin-line);
  }
  .lt-row:last-child {
    border-bottom: 1px solid var(--uin-line);
  }
  .lt-row-btn {
    appearance: none;
    background: transparent;
    border: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 18px 64px 1fr auto auto auto auto;
    align-items: center;
    gap: var(--uin-s-3);
    padding: 7px var(--uin-s-4);
    color: inherit;
    cursor: pointer;
    text-align: left;
    min-height: 34px;
    transition: background-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .lt-row-btn:hover {
    background: var(--uin-mat-hover);
  }
  .lt-row-btn:focus-visible {
    outline: none;
    background: var(--uin-mat-hover);
    box-shadow: inset 2px 0 0 var(--uin-accent);
  }
  .lt-row-prio {
    color: var(--uin-fg-mute);
    display: inline-flex;
  }
  .lt-row-id {
    font-family: var(--uin-font-mono);
    font-size: 11.5px;
    color: var(--uin-fg-dim);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
  }
  .lt-row-title {
    font-size: 13px;
    color: var(--uin-fg);
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lt-row-labels {
    display: inline-flex;
    gap: 4px;
    flex-wrap: nowrap;
  }
  .lt-label {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 1px 8px;
    font-size: 11px;
    color: var(--uin-fg-mute);
    line-height: 1.45;
  }
  .lt-label-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--lt-tone, var(--uin-accent));
  }
  .lt-label[data-tone='blue']  { --lt-tone: #5d8df0; }
  .lt-label[data-tone='mint']  { --lt-tone: #6dbe9a; }
  .lt-label[data-tone='amber'] { --lt-tone: #d9a23f; }
  .lt-label[data-tone='rose']  { --lt-tone: #d97a9a; }
  .lt-label[data-tone='plum']  { --lt-tone: #9b7bd1; }
  .lt-label[data-tone='slate'] { --lt-tone: #8995a3; }

  .lt-row-project {
    font-size: 11.5px;
    color: var(--uin-fg-dim);
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .lt-row-updated {
    font-size: 11.5px;
    color: var(--uin-fg-dim);
    font-variant-numeric: tabular-nums;
    min-width: 24px;
    text-align: right;
  }
  .lt-row-assignee :global(.uin-avatar) {
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--uin-line-strong) 70%, transparent);
  }

  .lt-empty {
    padding: var(--uin-s-7) var(--uin-s-4);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uin-s-1);
  }

  /* Priority palette — semantic-but-decoupled tones */
  :root {
    --lt-urgent: #e0594b;
    --lt-high:   #e4a23a;
    --lt-medium: #b6b6b6;
    --lt-low:    #a0a0a0;
  }
  :global([data-theme='dark']) {
    --lt-urgent: #ec6f60;
    --lt-high:   #e8b257;
    --lt-medium: #9b9ba2;
    --lt-low:    #888892;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --lt-urgent: #ec6f60;
      --lt-high:   #e8b257;
      --lt-medium: #9b9ba2;
      --lt-low:    #888892;
    }
  }

  /* Responsive ------------------------------------------------------- */
  @media (max-width: 900px) {
    .lt-row-btn {
      grid-template-columns: 18px 56px 1fr auto auto;
    }
    .lt-row-labels,
    .lt-row-project {
      display: none;
    }
    :global(.lt-search) {
      width: 140px;
    }
  }
</style>
