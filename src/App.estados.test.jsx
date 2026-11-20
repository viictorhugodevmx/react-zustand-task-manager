import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('Cambio de estado de tareas', () => {
  it('avanza una tarea de pendiente a en progreso', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Avanzar estado de Preparar entrevista técnica',
      }),
    )

    const lista = screen.getByRole('region', {
      name: 'Lista de tareas',
    })

    expect(
      within(lista).getAllByText('En progreso'),
    ).toHaveLength(2)

    const estadisticas = screen.getByRole('region', {
      name: 'Estadísticas de tareas',
    })

    const tarjetas = within(estadisticas).getAllByRole('article')

    expect(tarjetas[1]).toHaveTextContent('Pendientes0')
    expect(tarjetas[2]).toHaveTextContent('En progreso2')
  })

  it('permite completar una tarea en progreso', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Avanzar estado de Estudiar Zustand',
      }),
    )

    const estadisticas = screen.getByRole('region', {
      name: 'Estadísticas de tareas',
    })

    const tarjetas = within(estadisticas).getAllByRole('article')

    expect(tarjetas[2]).toHaveTextContent('En progreso0')
    expect(tarjetas[3]).toHaveTextContent('Completadas2')
  })

  it('no permite avanzar una tarea completada', () => {
    render(<App />)

    expect(
      screen.queryByRole('button', {
        name: 'Avanzar estado de Revisar componentes React',
      }),
    ).not.toBeInTheDocument()
  })
})
