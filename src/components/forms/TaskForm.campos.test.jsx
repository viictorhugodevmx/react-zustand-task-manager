import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TaskForm from './TaskForm'

describe('Campos controlados de TaskForm', () => {
  it('muestra correctamente los valores iniciales', () => {
    render(<TaskForm onCerrar={() => {}} />)

    expect(
      screen.getByRole('textbox', { name: /título/i }),
    ).toHaveValue('')

    expect(
      screen.getByRole('textbox', { name: /descripción/i }),
    ).toHaveValue('')

    expect(
      screen.getByRole('combobox', { name: /prioridad/i }),
    ).toHaveValue('media')

    expect(
      screen.getByLabelText('Fecha límite'),
    ).toHaveValue('')
  })

  it('actualiza título y descripción al escribir', async () => {
    const usuario = userEvent.setup()

    render(<TaskForm onCerrar={() => {}} />)

    const titulo = screen.getByRole('textbox', {
      name: /título/i,
    })

    const descripcion = screen.getByRole('textbox', {
      name: /descripción/i,
    })

    await usuario.type(titulo, 'Aprender Zustand')
    await usuario.type(descripcion, 'Practicar useStore')

    expect(titulo).toHaveValue('Aprender Zustand')
    expect(descripcion).toHaveValue('Practicar useStore')
  })

  it('permite modificar la prioridad y fecha límite', async () => {
    const usuario = userEvent.setup()

    render(<TaskForm onCerrar={() => {}} />)

    const prioridad = screen.getByRole('combobox', {
      name: /prioridad/i,
    })

    const fecha = screen.getByLabelText('Fecha límite')

    await usuario.selectOptions(prioridad, 'alta')
    await usuario.type(fecha, '2026-12-15')

    expect(prioridad).toHaveValue('alta')
    expect(fecha).toHaveValue('2026-12-15')
  })
})
