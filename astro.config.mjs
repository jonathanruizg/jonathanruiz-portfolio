import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  // Node adapter enables the /api/chat SSR route.
  // Swap for @astrojs/vercel or @astrojs/netlify when deploying.
  adapter: node({ mode: 'standalone' }),
  output: 'static',
});
