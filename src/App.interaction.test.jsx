import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('Interacciones de App', () => {
  it('abre y cierra el formulario desde la interfaz', async () => {
    const usuario = userEvent.setup()

    render(<App />)

    expect(
      screen.queryByRole('heading', { name: 'Nueva tarea' }),
    ).not.toBeInTheDocument()

    await usuario.click(
      screen.getByRole('button', { name: '+ Nueva tarea' }),
    )

    expect(
      screen.getByRole('heading', { name: 'Nueva tarea' }),
    ).toBeInTheDocument()

    await usuario.click(
      screen.getByRole('button', { name: 'Cancelar' }),
    )

    expect(
      screen.queryByRole('heading', { name: 'Nueva tarea' }),
    ).not.toBeInTheDocument()
  })
})
