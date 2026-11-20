import { describe, expect, it, vi } from 'vitest'

import { useTareasStore } from './useTareasStore'

describe('Edición de tareas con Zustand', () => {
  it('edita campos sin modificar ID ni estado', () => {
    useTareasStore.getState().editarTarea(1, {
      titulo: 'Entrevista actualizada',
      descripcion: 'Repasar Zustand',
      prioridad: 'media',
      id: 999,
      estado: 'completada',
    })

    const tarea = useTareasStore
      .getState()
      .tareas.find((item) => item.id === 1)

    expect(tarea.titulo).toBe('Entrevista actualizada')
    expect(tarea.descripcion).toBe('Repasar Zustand')
    expect(tarea.prioridad).toBe('media')
    expect(tarea.id).toBe(1)
    expect(tarea.estado).toBe('pendiente')
  })

  it('conserva las referencias cuando el ID no existe', () => {
    const estadoAnterior = useTareasStore.getState()
    const suscriptor = vi.fn()
    const cancelar = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().editarTarea(999, {
      titulo: 'No existe',
    })

    expect(useTareasStore.getState()).toBe(estadoAnterior)
    expect(suscriptor).not.toHaveBeenCalled()

    cancelar()
  })

  it('evita actualizaciones cuando los datos son iguales', () => {
    const estadoAnterior = useTareasStore.getState()
    const tituloActual = estadoAnterior.tareas[0].titulo
    const suscriptor = vi.fn()
    const cancelar = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().editarTarea(1, {
      titulo: tituloActual,
    })

    expect(useTareasStore.getState()).toBe(estadoAnterior)
    expect(suscriptor).not.toHaveBeenCalled()

    cancelar()
  })

  it('persiste los campos modificados en localStorage', async () => {
    useTareasStore.getState().editarTarea(2, {
      titulo: 'Zustand avanzado',
    })

    const guardado = JSON.parse(
      localStorage.getItem('task-manager-tareas'),
    )

    expect(guardado.state.tareas[1].titulo)
      .toBe('Zustand avanzado')

    await useTareasStore.persist.rehydrate()

    expect(useTareasStore.getState().tareas[1].titulo)
      .toBe('Zustand avanzado')
  })
})
