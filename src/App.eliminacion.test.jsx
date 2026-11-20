import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Eliminación de tareas desde App', () => {
  it('solicita confirmación antes de eliminar', () => {
    vi.stubGlobal('confirm', vi.fn(() => false))

    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Preparar entrevista técnica',
      }),
    )

    expect(window.confirm).toHaveBeenCalledOnce()
    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('Preparar entrevista técnica'),
    )

    expect(useTareasStore.getState().tareas).toHaveLength(3)
  })

  it('elimina únicamente la tarea confirmada', () => {
    vi.stubGlobal('confirm', vi.fn(() => true))

    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Preparar entrevista técnica',
      }),
    )

    expect(useTareasStore.getState().tareas).toHaveLength(2)

    expect(
      screen.queryByText('Preparar entrevista técnica'),
    ).not.toBeInTheDocument()

    expect(screen.getByText('Estudiar Zustand'))
      .toBeInTheDocument()
  })

  it('persiste la eliminación en localStorage', async () => {
    vi.stubGlobal('confirm', vi.fn(() => true))

    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Estudiar Zustand',
      }),
    )

    const datosGuardados = JSON.parse(
      localStorage.getItem('task-manager-tareas'),
    )

    expect(
      datosGuardados.state.tareas.some(
        (tarea) => tarea.id === 2,
      ),
    ).toBe(false)

    await useTareasStore.persist.rehydrate()

    expect(
      useTareasStore.getState().tareas.some(
        (tarea) => tarea.id === 2,
      ),
    ).toBe(false)
  })

  it('cierra la edición si se elimina la tarea seleccionada', () => {
    vi.stubGlobal('confirm', vi.fn(() => true))

    render(<App />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Editar Preparar entrevista técnica',
      }),
    )

    expect(
      screen.getByRole('heading', { name: 'Editar tarea' }),
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Preparar entrevista técnica',
      }),
    )

    expect(
      screen.queryByRole('heading', { name: 'Editar tarea' }),
    ).not.toBeInTheDocument()

    expect(
      useTareasStore.getState().tareas.some(
        (tarea) => tarea.id === 1,
      ),
    ).toBe(false)
  })
})
