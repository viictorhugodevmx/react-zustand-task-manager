import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ResumenZustand from './ResumenZustand'
import { useTareasStore } from '../../stores/useTareasStore'

afterEach(() => {
  useTareasStore.setState({ tareas: [] })
})

describe('ResumenZustand', () => {
  it('muestra el estado inicial del store', () => {
    render(<ResumenZustand />)

    expect(
      screen.getByText('Total de tareas en Zustand: 3'),
    ).toBeInTheDocument()
  })

  it('actualiza React cuando cambia el estado de Zustand', async () => {
    const usuario = userEvent.setup()

    render(<ResumenZustand />)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Agregar tarea de prueba',
      }),
    )

    expect(
      screen.getByText('Total de tareas en Zustand: 4'),
    ).toBeInTheDocument()

    expect(useTareasStore.getState().tareas).toHaveLength(4)
  })
})
