import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('Creación de tareas', () => {
  it('agrega una tarea y actualiza las estadísticas', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.click(
      screen.getByRole('button', { name: '+ Nueva tarea' }),
    )

    await usuario.type(
      screen.getByRole('textbox', { name: /título/i }),
      'Practicar React',
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Guardar tarea' }),
    )

    const lista = screen.getByRole('region', {
      name: 'Lista de tareas',
    })

    expect(
      within(lista).getByText('Practicar React'),
    ).toBeInTheDocument()

    expect(
      within(lista).getAllByRole('listitem'),
    ).toHaveLength(4)

    const estadisticas = screen.getByRole('region', {
      name: 'Estadísticas de tareas',
    })

    const tarjetas = within(estadisticas).getAllByRole('article')

    expect(tarjetas[0]).toHaveTextContent('Total4')
    expect(tarjetas[1]).toHaveTextContent('Pendientes2')

    expect(
      screen.queryByRole('heading', { name: 'Nueva tarea' }),
    ).not.toBeInTheDocument()
  })

  it('no agrega tareas cuando el formulario es inválido', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    await usuario.click(
      screen.getByRole('button', { name: '+ Nueva tarea' }),
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Guardar tarea' }),
    )

    expect(
      screen.getByRole('alert'),
    ).toHaveTextContent('El título es obligatorio.')

    const lista = screen.getByRole('region', {
      name: 'Lista de tareas',
    })

    expect(
      within(lista).getAllByRole('listitem'),
    ).toHaveLength(3)
  })
})
