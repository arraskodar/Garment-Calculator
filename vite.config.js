// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // point "vue" imports to the compiler-included build
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
})
