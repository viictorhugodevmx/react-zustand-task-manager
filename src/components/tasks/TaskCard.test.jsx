import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import TaskCard from './TaskCard'

const tarea = {
  id: 1,
  titulo: 'Aprender Zustand',
  descripcion: 'Practicar stores y selectores.',
  estado: 'en-progreso',
  prioridad: 'alta',
}

describe('TaskCard', () => {
  it('muestra el título y la descripción', () => {
    render(<TaskCard tarea={tarea} />)

    expect(
      screen.getByRole('heading', {
        name: 'Aprender Zustand',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Practicar stores y selectores.'),
    ).toBeInTheDocument()
  })

  it('muestra el estado y la prioridad', () => {
    render(<TaskCard tarea={tarea} />)

    expect(
      screen.getByText('En progreso'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Prioridad: Alta'),
    ).toBeInTheDocument()
  })

  it('no muestra descripción cuando está vacía', () => {
    render(
      <TaskCard
        tarea={{
          ...tarea,
          descripcion: '',
        }}
      />,
    )

    expect(
      screen.queryByText('Practicar stores y selectores.'),
    ).not.toBeInTheDocument()
  })
})
