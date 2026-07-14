// playwright.config.ts
import { defineConfig } from '@playwright/test'
 
export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
  
  // 👇 Configuramos Playwright para que levante tanto el backend como el frontend
  webServer: [
    {
      command: 'npm run dev',                  // Levanta el Frontend
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,   // En local reutiliza el que tengas abierto, en CI levanta uno limpio
      timeout: 30000,
    },
    {
      command: 'npm --prefix backend run dev', // Levanta el Backend
      url: 'http://localhost:3000/tasks',
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    }
  ],
})