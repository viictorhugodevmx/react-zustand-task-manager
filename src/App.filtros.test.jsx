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

describe('Filtros de tareas con Zustand', () => {
  it('filtra por estado pendiente', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.selectOptions(
      screen.getByRole('combobox', {
        name: 'Filtrar por estado',
      }),
      'pendiente',
    )

    expect(obtenerLista().getAllByRole('article')).toHaveLength(1)
    expect(
      obtenerLista().getByText('Preparar entrevista técnica'),
    ).toBeInTheDocument()
  })

  it('filtra por prioridad media', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.selectOptions(
      screen.getByRole('combobox', {
        name: 'Filtrar por prioridad',
      }),
      'media',
    )

    expect(obtenerLista().getAllByRole('article')).toHaveLength(1)
    expect(
      obtenerLista().getByText('Estudiar Zustand'),
    ).toBeInTheDocument()
  })

  it('combina filtros de estado y prioridad', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.selectOptions(
      screen.getByRole('combobox', {
        name: 'Filtrar por estado',
      }),
      'pendiente',
    )

    await usuario.selectOptions(
      screen.getByRole('combobox', {
        name: 'Filtrar por prioridad',
      }),
      'baja',
    )

    expect(
      obtenerLista().getByText('No hay tareas disponibles'),
    ).toBeInTheDocument()
  })

  it('combina búsqueda y prioridad sin modificar Zustand', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', {
        name: 'Buscar tareas',
      }),
      'React',
    )

    await usuario.selectOptions(
      screen.getByRole('combobox', {
        name: 'Filtrar por prioridad',
      }),
      'alta',
    )

    expect(obtenerLista().getAllByRole('article')).toHaveLength(1)
    expect(
      obtenerLista().getByText('Preparar entrevista técnica'),
    ).toBeInTheDocument()

    expect(useTareasStore.getState().tareas).toHaveLength(3)
  })
})
