// vitest.config.js
import { defineConfig } from 'vitest/config'
 
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**', // ignora la carpeta de pruebas de Playwright
      '**/backend/**',
      '**/.{idea,git,cache,output,temp}**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'e2e/**',
        'backend/**', // 🚫 Excluye también el backend del reporte de cobertura del front
        '**/*.css',
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.spec.{ts,tsx,js,jsx}',
        'vitest.config.*',
        'playwright.config.*',
        'src/test/setup.*'
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})
