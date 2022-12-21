import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
    includeAssets: ['langcards.png'],
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: {
      name: 'LangCards',
      short_name: 'lang cards',
      description: 'flashcards for language learning',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'langcards.png',
          sizes: '512x512',
          type: 'image/png'
        },
      ]
    }
  })
]
})