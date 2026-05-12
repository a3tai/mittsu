# Examples

Small SvelteKit demos that use `@a3tai/mittsu-svelte5` the same way as [`apps/web`](../apps/web): Vite, Svelte 5, `bits-ui` where needed, and design tokens from the package.

## Run from the repo root

After `npm install` at the monorepo root:

| App | Command | Dev server |
| --- | --- | --- |
| Task tracker (lists, sidebar, checkboxes) | `npm run example:tasks` or `npm run examples:task` | http://localhost:5174 |
| Ecommerce (grid, cart sheet, checkout layout) | `npm run example:shop` or `npm run examples:shop` | http://localhost:5175 |
| SaaS landing (hero, features, pricing, footer) | `npm run example:landing` or `npm run examples:landing` | http://localhost:5176 |

Or run a workspace directly:

```bash
npm --workspace @a3tai/mittsu-example-task-tracker run dev
npm --workspace @a3tai/mittsu-example-ecommerce run dev
npm --workspace @a3tai/mittsu-example-saas-landing run dev
```

## Build

```bash
npm --workspace @a3tai/mittsu-example-task-tracker run build
```

(Same pattern for the other two packages.)
