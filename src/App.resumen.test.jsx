import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

const obtenerResumen = () =>
  within(
    screen.getByRole('status', {
      name: 'Resumen de resultados',
    }),
  )

describe('Resumen de resultados con Zustand', () => {
  it('muestra inicialmente las tres tareas', () => {
    render(<App />)

    expect(
      obtenerResumen().getByText(/Mostrando/),
    ).toHaveTextContent('Mostrando 3 de 3 tareas')

    expect(
      obtenerResumen().getByText('100% visible'),
    ).toBeInTheDocument()
  })

  it('actualiza el resumen al buscar', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', { name: 'Buscar tareas' }),
      'Zustand',
    )

    expect(
      obtenerResumen().getByText(/Mostrando/),
    ).toHaveTextContent('Mostrando 1 de 3 tareas')

    expect(
      obtenerResumen().getByText('33% visible'),
    ).toBeInTheDocument()
  })

  it('muestra cero resultados si no hay coincidencias', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.type(
      screen.getByRole('searchbox', { name: 'Buscar tareas' }),
      'Sin coincidencias',
    )

    expect(
      obtenerResumen().getByText(/Mostrando/),
    ).toHaveTextContent('Mostrando 0 de 3 tareas')
  })

  it('mantiene el total del store al filtrar', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.selectOptions(
      screen.getByRole('combobox', {
        name: 'Filtrar por estado',
      }),
      'pendiente',
    )

    expect(
      obtenerResumen().getByText(/Mostrando/),
    ).toHaveTextContent('Mostrando 1 de 3 tareas')

    expect(useTareasStore.getState().tareas).toHaveLength(3)
  })
})
