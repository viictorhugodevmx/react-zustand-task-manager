import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('muestra el título principal de la aplicación', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'Task Manager',
      }),
    ).toBeInTheDocument()
  })

  it('muestra la descripción del laboratorio', () => {
    render(<App />)

    expect(
      screen.getByText(/laboratorio de react y zustand/i),
    ).toBeInTheDocument()
  })

  it('renderiza el contenido dentro del elemento main', () => {
    render(<App />)

    expect(
      screen.getByRole('main'),
    ).toBeInTheDocument()
  })
})
