import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'ES6',
    lib: {
      entry: 'src/main.ts',
      name: 'ChangeMe',
    },
    sourcemap: true
  },
  plugins: [dts()]
})
