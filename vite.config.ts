import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    miscExtensions: ['sockjs-client'],
                },
            },
        },
    },

    resolve: {
        alias:
            {
                // @ts-ignore
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
    },
    server: {
        port: 3030,
        watch: {
            usePolling: true,
        },
        strictPort: true,
        host: true,
    },

    define: {
        global: {},
    },
})