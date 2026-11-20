import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import TaskList from './TaskList'

const tareas = [
  {
    id: 1,
    titulo: 'Estudiar React',
    descripcion: 'Repasar componentes.',
    estado: 'pendiente',
    prioridad: 'alta',
  },
  {
    id: 2,
    titulo: 'Aprender Zustand',
    descripcion: 'Practicar stores.',
    estado: 'en-progreso',
    prioridad: 'media',
  },
]

describe('TaskList', () => {
  it('muestra las tareas recibidas por props', () => {
    render(<TaskList tareas={tareas} />)

    expect(
      screen.getByText('Estudiar React'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Aprender Zustand'),
    ).toBeInTheDocument()
  })

  it('muestra el estado vacío cuando no hay tareas', () => {
    render(<TaskList tareas={[]} />)

    expect(
      screen.getByRole('status'),
    ).toHaveTextContent('No hay tareas disponibles')

    expect(
      screen.queryByRole('list'),
    ).not.toBeInTheDocument()
  })

  it('renderiza una tarjeta por cada tarea', () => {
    render(<TaskList tareas={tareas} />)

    expect(
      screen.getAllByRole('listitem'),
    ).toHaveLength(2)
  })
})
