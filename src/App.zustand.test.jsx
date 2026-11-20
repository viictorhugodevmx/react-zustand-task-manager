import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

describe('Integración de App con Zustand', () => {
  it('carga las tareas iniciales desde el store', () => {
    render(<App />)

    const tareas = useTareasStore.getState().tareas

    expect(tareas).toHaveLength(3)

    expect(
      screen.getByText('Preparar entrevista técnica'),
    ).toBeInTheDocument()
  })

  it('actualiza el store cuando cambia el estado de una tarea', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Avanzar estado de Preparar entrevista técnica',
      }),
    )

    const primeraTarea = useTareasStore
      .getState()
      .tareas.find((tarea) => tarea.id === 1)

    expect(primeraTarea.estado).toBe('en-progreso')
  })

  it('utiliza las acciones del store para gestionar las tareas', () => {
    render(<App />)

    const { agregarTarea } = useTareasStore.getState()

    expect(agregarTarea).toEqual(expect.any(Function))

    expect(
      useTareasStore.getState().obtenerTotal(),
    ).toBe(3)
  })
})
