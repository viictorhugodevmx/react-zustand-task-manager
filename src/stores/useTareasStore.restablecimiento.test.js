import { describe, expect, it } from 'vitest'

import { tareasIniciales } from '../data/tareasIniciales'
import { useTareasStore } from './useTareasStore'

const claveStorage = 'task-manager-tareas'

const tareaEjemplo = {
  titulo: 'Tarea temporal',
  descripcion: 'Probar restablecimiento',
  prioridad: 'media',
  fechaLimite: '',
}

describe('Restablecimiento de tareas persistidas', () => {
  it('restablece las tres tareas originales', () => {
    const store = useTareasStore.getState()

    store.agregarTarea(tareaEjemplo)

    expect(useTareasStore.getState().tareas).toHaveLength(4)

    useTareasStore.getState().cargarTareasIniciales()

    expect(useTareasStore.getState().tareas)
      .toEqual(tareasIniciales)
  })

  it('guarda el restablecimiento en localStorage', async () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    useTareasStore.getState().cargarTareasIniciales()

    const datosGuardados = JSON.parse(
      localStorage.getItem(claveStorage),
    )

    expect(datosGuardados.state.tareas)
      .toEqual(tareasIniciales)

    await useTareasStore.persist.rehydrate()

    expect(useTareasStore.getState().tareas)
      .toEqual(tareasIniciales)
  })

  it('distingue limpiar almacenamiento de cambiar el estado', async () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    expect(useTareasStore.getState().tareas).toHaveLength(4)

    await useTareasStore.persist.clearStorage()

    expect(localStorage.getItem(claveStorage)).toBeNull()

    expect(useTareasStore.getState().tareas).toHaveLength(4)

    useTareasStore.getState().cargarTareasIniciales()

    expect(useTareasStore.getState().tareas).toHaveLength(3)
    expect(localStorage.getItem(claveStorage)).not.toBeNull()
  })
})
