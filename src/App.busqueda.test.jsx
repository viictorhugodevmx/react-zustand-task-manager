import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

const obtenerLista = () =>
  within(
    screen.getByRole('region', {
      name: 'Lista de tareas',
    }),
  )

describe('Búsqueda de tareas con Zustand', () => {
  it('muestra inicialmente las tres tareas', () => {
    render(<App />)

    expect(obtenerLista().getAllByRole('article')).toHaveLength(3)
  })

  it('filtra por título en tiempo real', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', {
        name: 'Buscar tareas',
      }),
      'Zustand',
    )

    expect(
      obtenerLista().getByText('Estudiar Zustand'),
    ).toBeInTheDocument()

    expect(
      obtenerLista().queryByText('Preparar entrevista técnica'),
    ).not.toBeInTheDocument()

    expect(useTareasStore.getState().tareas).toHaveLength(3)
  })

  it('busca por descripción ignorando acentos', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', {
        name: 'Buscar tareas',
      }),
      'TECNICA',
    )

    expect(
      obtenerLista().getByText('Preparar entrevista técnica'),
    ).toBeInTheDocument()
  })

  it('restaura todas las tareas al limpiar la búsqueda', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', {
        name: 'Buscar tareas',
      }),
      'Zustand',
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Limpiar' }),
    )

    expect(obtenerLista().getAllByRole('article')).toHaveLength(3)

    expect(
      screen.getByRole('searchbox', {
        name: 'Buscar tareas',
      }),
    ).toHaveValue('')
  })
})
