import { describe, expect, it, vi } from 'vitest'

import { useTareasStore } from './useTareasStore'

const tareaEjemplo = {
  titulo: 'Optimizar Zustand',
  descripcion: 'Evitar actualizaciones innecesarias',
  prioridad: 'media',
  fechaLimite: '',
}

const crearTarea = () => {
  useTareasStore.getState().agregarTarea(tareaEjemplo)

  return useTareasStore.getState().tareas.at(-1).id
}

describe('Optimización de actualizaciones Zustand', () => {
  it('no modifica el estado cuando el ID no existe', () => {
    const estadoAnterior = useTareasStore.getState()
    const suscriptor = vi.fn()

    const cancelar = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().cambiarEstado('id-inexistente')

    expect(useTareasStore.getState()).toBe(estadoAnterior)
    expect(suscriptor).not.toHaveBeenCalled()

    cancelar()
  })

  it('no notifica cambios cuando la tarea ya está completada', () => {
    const id = crearTarea()

    useTareasStore.getState().cambiarEstado(id)
    useTareasStore.getState().cambiarEstado(id)

    const estadoAnterior = useTareasStore.getState()
    const suscriptor = vi.fn()

    const cancelar = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().cambiarEstado(id)

    expect(useTareasStore.getState()).toBe(estadoAnterior)
    expect(suscriptor).not.toHaveBeenCalled()

    cancelar()
  })

  it('actualiza y persiste cuando existe un cambio válido', () => {
    const id = crearTarea()
    const suscriptor = vi.fn()

    const cancelar = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().cambiarEstado(id)

    expect(suscriptor).toHaveBeenCalledTimes(1)

    const tareaActualizada = useTareasStore
      .getState()
      .tareas.find((tarea) => tarea.id === id)

    expect(tareaActualizada.estado).toBe('en-progreso')

    const datosGuardados = JSON.parse(
      localStorage.getItem('task-manager-tareas'),
    )

    expect(
      datosGuardados.state.tareas.find(
        (tarea) => tarea.id === id,
      ).estado,
    ).toBe('en-progreso')

    cancelar()
  })
})
