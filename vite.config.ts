import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import ViteYaml from '@modyfi/vite-plugin-yaml'

const path = require('path')

export default defineConfig({
  build: {
    target: 'ES6',
    lib: {
      entry: 'src/main.ts',
      name: 'main',
      fileName: 'store-module'
    },
    sourcemap: true
  },
  resolve: {
    alias: {
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils')
    }
  },
  plugins: [
    dts(),
    ViteYaml()
  ]
})
