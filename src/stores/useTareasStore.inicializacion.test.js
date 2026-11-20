import { afterEach, describe, expect, it } from 'vitest'

import { tareasIniciales } from '../data/tareasIniciales'
import { useTareasStore } from './useTareasStore'

afterEach(() => {
  useTareasStore.setState({ tareas: [] })
})

describe('Inicialización de tareas en Zustand', () => {
  it('carga las tres tareas iniciales', () => {
    useTareasStore.getState().cargarTareasIniciales()

    const tareas = useTareasStore.getState().tareas

    expect(tareas).toHaveLength(3)
    expect(tareas).toEqual(tareasIniciales)
  })

  it('mantiene independientes los objetos del store y los originales', () => {
    useTareasStore.getState().cargarTareasIniciales()

    const tareas = useTareasStore.getState().tareas

    expect(tareas).not.toBe(tareasIniciales)
    expect(tareas[0]).not.toBe(tareasIniciales[0])
  })

  it('conserva las acciones después de cargar los datos', () => {
    useTareasStore.getState().cargarTareasIniciales()

    expect(useTareasStore.getState().obtenerTotal()).toBe(3)

    useTareasStore.getState().cambiarEstado(1)

    const primeraTarea = useTareasStore.getState().tareas[0]

    expect(primeraTarea.estado).toBe('en-progreso')
    expect(tareasIniciales[0].estado).toBe('pendiente')
  })
})
