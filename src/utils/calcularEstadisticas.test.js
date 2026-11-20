import { describe, expect, it } from 'vitest'

import { calcularEstadisticas } from './calcularEstadisticas'

describe('calcularEstadisticas', () => {
  it('cuenta correctamente las tareas por estado', () => {
    const tareas = [
      { id: 1, estado: 'pendiente' },
      { id: 2, estado: 'pendiente' },
      { id: 3, estado: 'en-progreso' },
      { id: 4, estado: 'completada' },
    ]

    const resultado = calcularEstadisticas(tareas)

    expect(resultado.map((item) => item.valor)).toEqual([
      4, 2, 1, 1,
    ])
  })

  it('devuelve estadísticas en cero cuando no hay tareas', () => {
    const resultado = calcularEstadisticas([])

    expect(resultado.map((item) => item.valor)).toEqual([
      0, 0, 0, 0,
    ])
  })

  it('no modifica el arreglo original', () => {
    const tareas = [
      { id: 1, estado: 'pendiente' },
    ]

    const copiaOriginal = structuredClone(tareas)

    calcularEstadisticas(tareas)

    expect(tareas).toEqual(copiaOriginal)
  })
})
