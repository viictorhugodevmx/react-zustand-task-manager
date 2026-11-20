import { describe, expect, it } from 'vitest'
import { ordenarTareas } from './ordenarTareas'

const tareas = [
  {
    id: 1,
    titulo: 'Zustand',
    prioridad: 'media',
    fechaLimite: '2027-03-15',
  },
  {
    id: 2,
    titulo: 'Angular',
    prioridad: 'alta',
    fechaLimite: '',
  },
  {
    id: 3,
    titulo: 'React',
    prioridad: 'baja',
    fechaLimite: '2027-01-10',
  },
]

const obtenerIds = (resultado) =>
  resultado.map((tarea) => tarea.id)

describe('ordenarTareas', () => {
  it('conserva el orden original por defecto', () => {
    expect(obtenerIds(ordenarTareas(tareas))).toEqual([1, 2, 3])
  })

  it('ordena alfabéticamente por título', () => {
    expect(
      obtenerIds(ordenarTareas(tareas, 'titulo-asc')),
    ).toEqual([2, 3, 1])
  })

  it('ordena prioridad alta primero', () => {
    expect(
      obtenerIds(ordenarTareas(tareas, 'prioridad-alta')),
    ).toEqual([2, 1, 3])
  })

  it('ordena prioridad baja primero', () => {
    expect(
      obtenerIds(ordenarTareas(tareas, 'prioridad-baja')),
    ).toEqual([3, 1, 2])
  })

  it('ordena por fecha y deja las tareas sin fecha al final', () => {
    expect(
      obtenerIds(ordenarTareas(tareas, 'fecha-asc')),
    ).toEqual([3, 1, 2])
  })

  it('no modifica el arreglo original', () => {
    const resultado = ordenarTareas(tareas, 'titulo-asc')

    expect(obtenerIds(tareas)).toEqual([1, 2, 3])
    expect(resultado).not.toBe(tareas)
  })
})
