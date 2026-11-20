import { beforeEach, describe, expect, it, vi } from 'vitest'

import { tareasIniciales } from '../data/tareasIniciales'
import { useTareasStore } from './useTareasStore'

const tareaEjemplo = {
  titulo: 'Aprender Zustand',
  descripcion: 'Comprender create, set y get',
  prioridad: 'alta',
  fechaLimite: '',
}

beforeEach(() => {
  useTareasStore.setState({ tareas: [] })
})

describe('useTareasStore', () => {
  it('define las tres tareas iniciales al crear el store', () => {
    expect(useTareasStore.getInitialState().tareas)
      .toEqual(tareasIniciales)
  })

  it('agrega una tarea con ID y estado pendiente', () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    const { tareas } = useTareasStore.getState()

    expect(tareas).toHaveLength(1)
    expect(tareas[0]).toEqual({
      ...tareaEjemplo,
      id: expect.any(String),
      estado: 'pendiente',
    })
  })

  it('avanza una tarea hasta completada', () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    const id = useTareasStore.getState().tareas[0].id

    useTareasStore.getState().cambiarEstado(id)

    expect(useTareasStore.getState().tareas[0].estado)
      .toBe('en-progreso')

    useTareasStore.getState().cambiarEstado(id)

    expect(useTareasStore.getState().tareas[0].estado)
      .toBe('completada')
  })

  it('obtiene el total actual mediante get', () => {
    expect(useTareasStore.getState().obtenerTotal()).toBe(0)

    useTareasStore.getState().agregarTarea(tareaEjemplo)

    expect(useTareasStore.getState().obtenerTotal()).toBe(1)
  })

  it('notifica a los suscriptores cuando cambia el estado', () => {
    const suscriptor = vi.fn()
    const cancelarSuscripcion = useTareasStore.subscribe(suscriptor)

    useTareasStore.getState().agregarTarea(tareaEjemplo)

    expect(suscriptor).toHaveBeenCalledTimes(1)

    cancelarSuscripcion()
  })
})
