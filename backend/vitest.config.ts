// backend/vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // 👈 Para el backend usamos Node puro, no jsdom
    // 🚫 NO ponemos setupFiles aquí porque no necesitamos las librerías de React
  },
})