import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  ssr: {
    // bits-ui ships .svelte files; Node's ESM loader can't import them
    // directly during SSR. Tell Vite to bundle bits-ui rather than
    // externalize it.
    noExternal: ['bits-ui'],
  },
});
