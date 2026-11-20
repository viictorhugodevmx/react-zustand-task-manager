import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

const obtenerTitulos = () => {
  const lista = within(
    screen.getByRole('region', {
      name: 'Lista de tareas',
    }),
  )

  return lista
    .getAllByRole('heading', { level: 3 })
    .map((titulo) => titulo.textContent)
}

describe('Ordenamiento de tareas', () => {
  it('ordena las tareas alfabéticamente', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.selectOptions(
      screen.getByRole('combobox', { name: 'Ordenar por' }),
      'titulo-asc',
    )

    expect(obtenerTitulos()).toEqual([
      'Estudiar Zustand',
      'Preparar entrevista técnica',
      'Revisar componentes React',
    ])
  })

  it('ordena por prioridad y conserva el store', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.selectOptions(
      screen.getByRole('combobox', { name: 'Ordenar por' }),
      'prioridad-baja',
    )

    expect(obtenerTitulos()).toEqual([
      'Revisar componentes React',
      'Estudiar Zustand',
      'Preparar entrevista técnica',
    ])

    expect(
      useTareasStore.getState().tareas.map((tarea) => tarea.id),
    ).toEqual([1, 2, 3])
  })

  it('combina búsqueda y ordenamiento', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', { name: 'Buscar tareas' }),
      'React',
    )

    await usuario.selectOptions(
      screen.getByRole('combobox', { name: 'Ordenar por' }),
      'titulo-asc',
    )

    expect(obtenerTitulos()).toEqual([
      'Preparar entrevista técnica',
      'Revisar componentes React',
    ])
  })
})
