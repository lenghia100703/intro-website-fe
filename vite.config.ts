import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {

        },
    },

    resolve: {
        alias:
            {
                // @ts-ignore
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
    },

    define: {
        global: {},
    },
})