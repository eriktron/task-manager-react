// backend/tests/tareas.test.ts
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/index' // Apunta a tu index.ts que ahora exporta 'app'

describe('Bug 3: Validación de tareas vacías en POST /tasks', () => {
  it('debería rechazar con un error 400 si el título está vacío', async () => {
    // Act: Enviamos un título vacío
    const res = await request(app)
      .post('/tasks')
      .send({ title: '' })

    // Assert: Esperamos un error 400 Bad Request
    expect(res.status).toBe(400)
  })

  it('debería rechazar con un error 400 si el título contiene solo espacios en blanco', async () => {
    // Act: Enviamos puros espacios en blanco
    const res = await request(app)
      .post('/tasks')
      .send({ title: '     ' })

    // Assert: Esperamos un error 400 Bad Request
    expect(res.status).toBe(400)
  })
})