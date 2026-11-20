import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TaskForm from './TaskForm'

describe('Validaciones de TaskForm', () => {
  it('muestra error si el título está vacío', async () => {
    const usuario = userEvent.setup()
    const onGuardar = vi.fn()

    render(
      <TaskForm
        onCerrar={() => {}}
        onGuardar={onGuardar}
      />,
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Guardar tarea' }),
    )

    expect(screen.getByRole('alert'))
      .toHaveTextContent('El título es obligatorio.')

    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('limpia el error al corregir el título', async () => {
    const usuario = userEvent.setup()

    render(
      <TaskForm
        onCerrar={() => {}}
        onGuardar={() => {}}
      />,
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Guardar tarea' }),
    )

    await usuario.type(
      screen.getByRole('textbox', { name: /título/i }),
      'Estudiar React',
    )

    expect(screen.queryByRole('alert'))
      .not.toBeInTheDocument()
  })

  it('envía los datos válidos normalizados', async () => {
    const usuario = userEvent.setup()
    const onGuardar = vi.fn()

    render(
      <TaskForm
        onCerrar={() => {}}
        onGuardar={onGuardar}
      />,
    )

    await usuario.type(
      screen.getByRole('textbox', { name: /título/i }),
      '  Aprender Zustand  ',
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Guardar tarea' }),
    )

    expect(onGuardar).toHaveBeenCalledWith({
      titulo: 'Aprender Zustand',
      descripcion: '',
      prioridad: 'media',
      fechaLimite: '',
    })
  })
})
