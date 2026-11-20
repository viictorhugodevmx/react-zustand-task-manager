import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'

import App from './App'
import { tareasIniciales } from './data/tareasIniciales'
import { useTareasStore } from './stores/useTareasStore'

const tareaEjemplo = {
  titulo: 'Tarea temporal para restablecer',
  descripcion: 'Validar confirmación',
  prioridad: 'alta',
  fechaLimite: '',
}

const agregarTareaTemporal = () => {
  act(() => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Restablecimiento desde la interfaz', () => {
  it('conserva las tareas cuando se cancela', () => {
    vi.stubGlobal('confirm', vi.fn(() => false))

    render(<App />)
    agregarTareaTemporal()

    fireEvent.click(
      screen.getByRole('button', { name: 'Restablecer tareas' }),
    )

    expect(window.confirm).toHaveBeenCalledOnce()
    expect(useTareasStore.getState().tareas).toHaveLength(4)

    expect(
      screen.getByText(tareaEjemplo.titulo),
    ).toBeInTheDocument()
  })

  it('recupera las tareas originales cuando se confirma', () => {
    vi.stubGlobal('confirm', vi.fn(() => true))

    render(<App />)
    agregarTareaTemporal()

    fireEvent.click(
      screen.getByRole('button', { name: 'Restablecer tareas' }),
    )

    expect(useTareasStore.getState().tareas)
      .toEqual(tareasIniciales)

    expect(
      screen.queryByText(tareaEjemplo.titulo),
    ).not.toBeInTheDocument()
  })

  it('persiste el restablecimiento en localStorage', async () => {
    vi.stubGlobal('confirm', vi.fn(() => true))

    render(<App />)
    agregarTareaTemporal()

    fireEvent.click(
      screen.getByRole('button', { name: 'Restablecer tareas' }),
    )

    const datosGuardados = JSON.parse(
      localStorage.getItem('task-manager-tareas'),
    )

    expect(datosGuardados.state.tareas)
      .toEqual(tareasIniciales)

    await act(async () => {
      await useTareasStore.persist.rehydrate()
    })

    expect(useTareasStore.getState().tareas)
      .toEqual(tareasIniciales)
  })
})
