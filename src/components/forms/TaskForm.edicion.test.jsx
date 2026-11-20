import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import TaskForm from './TaskForm'

const tareaExistente = {
  id: 25,
  titulo: 'Estudiar Zustand',
  descripcion: 'Practicar selectores',
  estado: 'en-progreso',
  prioridad: 'alta',
  fechaLimite: '',
}

describe('TaskForm reutilizable para edición', () => {
  it('precarga los datos de una tarea existente', () => {
    render(
      <TaskForm
        tareaInicial={tareaExistente}
        onGuardar={vi.fn()}
        onCerrar={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Editar tarea' }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Título *'))
      .toHaveValue('Estudiar Zustand')

    expect(screen.getByLabelText('Descripción'))
      .toHaveValue('Practicar selectores')

    expect(screen.getByLabelText('Prioridad'))
      .toHaveValue('alta')

    expect(
      screen.getByRole('button', { name: 'Guardar cambios' }),
    ).toBeInTheDocument()
  })

  it('envía los datos editados y normalizados', () => {
    const onGuardar = vi.fn()

    render(
      <TaskForm
        tareaInicial={tareaExistente}
        onGuardar={onGuardar}
        onCerrar={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText('Título *'), {
      target: { value: '  Zustand avanzado  ' },
    })

    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: '  Nuevos conceptos  ' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Guardar cambios' }),
    )

    expect(onGuardar).toHaveBeenCalledExactlyOnceWith({
      titulo: 'Zustand avanzado',
      descripcion: 'Nuevos conceptos',
      prioridad: 'alta',
      fechaLimite: '',
    })
  })

  it('impide guardar una edición inválida', () => {
    const onGuardar = vi.fn()

    render(
      <TaskForm
        tareaInicial={tareaExistente}
        onGuardar={onGuardar}
        onCerrar={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText('Título *'), {
      target: { value: '  ' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Guardar cambios' }),
    )

    expect(
      screen.getByText('El título es obligatorio.'),
    ).toBeInTheDocument()

    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('mantiene el modo creación sin tarea inicial', () => {
    render(
      <TaskForm
        onGuardar={vi.fn()}
        onCerrar={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Nueva tarea' }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Título *')).toHaveValue('')

    expect(
      screen.getByRole('button', { name: 'Guardar tarea' }),
    ).toBeInTheDocument()
  })
})
