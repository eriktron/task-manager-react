// e2e/flujo-tareas.spec.js
import { test, expect } from '@playwright/test'
 
test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')
 
  // 2. Escribir el texto de la tarea
  await page.getByPlaceholder('Escribe tu nueva tarea').fill('Comprar pan')

  // Preparamos la escucha de la petición de red que hace el Frontend hacia el Backend (POST /tasks)
  // Esto asegura que Playwright espere a que la base de datos de Render responda antes de buscar el texto
  const respuestaAPI = page.waitForResponse(response => 
    response.url().includes('/tasks') && response.request().method() === 'POST'
  );

  // Damos clic al botón para enviar la tarea
  await page.getByRole('button', { name: 'Agregar Tarea' }).click()

  // Esperamos que la red complete el guardado real en Render
  await respuestaAPI;
 
  // 3. Verla en la lista con un timeout extendido (por si la conexión a Render está un poco lenta)
  await expect(page.getByText('Comprar pan')).toBeVisible({ timeout: 8000 })
})
