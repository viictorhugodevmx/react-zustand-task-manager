import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TaskForm from './TaskForm'

describe('TaskForm', () => {
  it('muestra el encabezado del formulario', () => {
    render(<TaskForm onCerrar={() => {}} />)

    expect(
      screen.getByRole('heading', { name: 'Nueva tarea' }),
    ).toBeInTheDocument()
  })

  it('ejecuta onCerrar al pulsar Cancelar', async () => {
    const usuario = userEvent.setup()
    const onCerrar = vi.fn()

    render(<TaskForm onCerrar={onCerrar} />)

    await usuario.click(
      screen.getByRole('button', { name: 'Cancelar' }),
    )

    expect(onCerrar).toHaveBeenCalledOnce()
  })

  it('ejecuta onCerrar al pulsar el botón de cierre', async () => {
    const usuario = userEvent.setup()
    const onCerrar = vi.fn()

    render(<TaskForm onCerrar={onCerrar} />)

    await usuario.click(
      screen.getByRole('button', { name: 'Cerrar formulario' }),
    )

    expect(onCerrar).toHaveBeenCalledOnce()
  })
})
