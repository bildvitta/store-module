import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'

const path = require('path')

export default defineConfig({
  build: {
    target: 'ES6',
    lib: {
      entry: 'src/main.ts',
      name: 'ChangeMe',
    },
    sourcemap: true
  },
  resolve: {
    alias: {
      types: path.resolve(__dirname, './src/types')
    }
  },
  plugins: [dts()]
})
