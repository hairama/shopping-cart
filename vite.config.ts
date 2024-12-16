import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      workbox: {
        // Customize workbox options if needed
        globPatterns: ['**/*.{html,js,css,png,jpg,svg}'],
      },
      manifest: {
        name: 'QuickList',
        short_name: 'QuickList',
        description: 'Spend less time shopping',
        theme_color: '#EEF0F4',
        background_color: '#EEF0F4',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: './android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});

