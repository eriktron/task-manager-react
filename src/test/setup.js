// src/test/setup.js
import { expect, beforeEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

// Le inyectamos los métodos de validación a Vitest
expect.extend(matchers)

//AGREGA ESTO: Limpia el DOM simulado automáticamente antes de cada prueba
beforeEach(() => {
  cleanup()
})