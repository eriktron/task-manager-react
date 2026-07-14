/* // @vitest-environment jsdom
// src/components/TaskInput.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskInput from './TaskInput' // Asegúrate de que la ruta apunte bien a tu componente

describe('TaskInput', () => {
  it('llama a onAddTask con el texto escrito por el usuario', async () => {
    // Arrange
    const onAddTaskMock = vi.fn()
    render(<TaskInput onAddTask={onAddTaskMock} />)
    const usuario = userEvent.setup()

    // Act
    // Como tu input no tiene una etiqueta <label>, lo buscamos por su placeholder
    const input = screen.getByPlaceholderText('Escribe tu nueva tarea')
    await usuario.type(input, 'Comprar pan')
    await usuario.click(screen.getByText('Agregar Tarea'))

    // Assert
    expect(onAddTaskMock).toHaveBeenCalledWith('Comprar pan')
  })

  it('no llama a onAddTask si el campo está vacío', async () => {
    // Arrange
    const onAddTaskMock = vi.fn()
    render(<TaskInput onAddTask={onAddTaskMock} />)
    const usuario = userEvent.setup()

    // Act
    await usuario.click(screen.getByText('Agregar Tarea'))

    // Assert
    expect(onAddTaskMock).not.toHaveBeenCalled()
  })
}) */