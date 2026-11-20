import { describe, expect, it } from 'vitest'
import { filtrarTareas } from './filtrarTareas'

const tareas = [
  { id: 1, estado: 'pendiente', prioridad: 'alta' },
  { id: 2, estado: 'en-progreso', prioridad: 'media' },
  { id: 3, estado: 'completada', prioridad: 'baja' },
  { id: 4, estado: 'pendiente', prioridad: 'media' },
]

describe('filtrarTareas', () => {
  it('devuelve todas las tareas sin filtros activos', () => {
    expect(filtrarTareas(tareas)).toHaveLength(4)
  })

  it('filtra por estado', () => {
    expect(
      filtrarTareas(tareas, 'pendiente').map((tarea) => tarea.id),
    ).toEqual([1, 4])
  })

  it('filtra por prioridad', () => {
    expect(
      filtrarTareas(tareas, 'todos', 'media')
        .map((tarea) => tarea.id),
    ).toEqual([2, 4])
  })

  it('combina estado y prioridad', () => {
    expect(
      filtrarTareas(tareas, 'pendiente', 'media')
        .map((tarea) => tarea.id),
    ).toEqual([4])
  })

  it('devuelve vacío si no hay coincidencias', () => {
    expect(
      filtrarTareas(tareas, 'completada', 'alta'),
    ).toEqual([])
  })

  it('no modifica el arreglo original', () => {
    const resultado = filtrarTareas(tareas, 'pendiente')

    expect(tareas).toHaveLength(4)
    expect(resultado).not.toBe(tareas)
  })
})
