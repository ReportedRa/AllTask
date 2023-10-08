import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  plugins: [svelte()],
  preprocess: vitePreprocess(),
}
