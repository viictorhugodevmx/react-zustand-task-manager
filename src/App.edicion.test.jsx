import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

describe('Edición de tareas desde App', () => {
  it('abre el formulario con los datos de la tarea seleccionada', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Editar Preparar entrevista técnica',
      }),
    )

    expect(
      screen.getByRole('heading', { name: 'Editar tarea' }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Título *'))
      .toHaveValue('Preparar entrevista técnica')

    expect(screen.getByLabelText('Prioridad'))
      .toHaveValue('alta')
  })

  it('guarda la edición sin alterar el ID ni el estado', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Editar Preparar entrevista técnica',
      }),
    )

    fireEvent.change(screen.getByLabelText('Título *'), {
      target: { value: 'Preparar entrevista React Senior' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Guardar cambios' }),
    )

    const tarea = useTareasStore
      .getState()
      .tareas.find((item) => item.id === 1)

    expect(tarea.titulo).toBe('Preparar entrevista React Senior')
    expect(tarea.id).toBe(1)
    expect(tarea.estado).toBe('pendiente')

    expect(
      screen.getByText('Preparar entrevista React Senior'),
    ).toBeInTheDocument()

    const guardado = JSON.parse(
      localStorage.getItem('task-manager-tareas'),
    )

    expect(guardado.state.tareas[0].titulo)
      .toBe('Preparar entrevista React Senior')
  })

  it('permite cancelar la edición sin modificar la tarea', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Editar Preparar entrevista técnica',
      }),
    )

    fireEvent.change(screen.getByLabelText('Título *'), {
      target: { value: 'Cambio descartado' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Cancelar' }),
    )

    expect(useTareasStore.getState().tareas[0].titulo)
      .toBe('Preparar entrevista técnica')

    expect(
      screen.queryByRole('heading', { name: 'Editar tarea' }),
    ).not.toBeInTheDocument()
  })

  it('actualiza los campos al seleccionar otra tarea', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Editar Preparar entrevista técnica',
      }),
    )

    expect(screen.getByLabelText('Título *'))
      .toHaveValue('Preparar entrevista técnica')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Editar Estudiar Zustand',
      }),
    )

    expect(screen.getByLabelText('Título *'))
      .toHaveValue('Estudiar Zustand')

    expect(screen.getByLabelText('Prioridad'))
      .toHaveValue('media')
  })
})
