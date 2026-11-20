import { describe, expect, it, vi } from 'vitest'

import { useTareasStore } from './useTareasStore'

const claveStorage = 'task-manager-tareas'

describe('Eliminación de tareas con Zustand', () => {
  it('elimina únicamente la tarea seleccionada', () => {
    const tareasAnteriores = useTareasStore.getState().tareas
    const tareaConservada = tareasAnteriores[1]

    useTareasStore.getState().eliminarTarea(1)

    const tareasActuales = useTareasStore.getState().tareas

    expect(tareasActuales).toHaveLength(2)
    expect(tareasActuales.some((tarea) => tarea.id === 1))
      .toBe(false)

    expect(tareasActuales[0]).toBe(tareaConservada)
    expect(tareasAnteriores).toHaveLength(3)
  })

  it('no actualiza el store cuando el ID no existe', () => {
    const estadoAnterior = useTareasStore.getState()
    const suscriptor = vi.fn()

    const cancelar = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().eliminarTarea('id-inexistente')

    expect(useTareasStore.getState()).toBe(estadoAnterior)
    expect(suscriptor).not.toHaveBeenCalled()

    cancelar()
  })

  it('persiste la eliminación en localStorage', async () => {
    useTareasStore.getState().eliminarTarea(2)

    const datosGuardados = JSON.parse(
      localStorage.getItem(claveStorage),
    )

    expect(datosGuardados.state.tareas).toHaveLength(2)

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

  it('permite eliminar todas las tareas sin restaurarlas automáticamente', () => {
    const ids = useTareasStore.getState().tareas.map(
      (tarea) => tarea.id,
    )

    ids.forEach((id) => {
      useTareasStore.getState().eliminarTarea(id)
    })

    expect(useTareasStore.getState().tareas).toEqual([])

    const datosGuardados = JSON.parse(
      localStorage.getItem(claveStorage),
    )

    expect(datosGuardados.state.tareas).toEqual([])
  })
})
