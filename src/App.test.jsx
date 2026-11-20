import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App Task Manager', () => {
  it('muestra el título principal', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Task Manager' }),
    ).toBeInTheDocument()
  })

  it('muestra las estadísticas iniciales', () => {
    render(<App />)

    expect(
      screen.getByRole('region', { name: 'Estadísticas de tareas' }),
    ).toBeInTheDocument()
  })

  it('renderiza las tareas de ejemplo', () => {
    render(<App />)

    expect(
      screen.getByText('Estudiar Zustand'),
    ).toBeInTheDocument()
  })
})
