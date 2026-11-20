import { describe, expect, it } from 'vitest'
import { calcularResumenVista } from './calcularResumenVista'

const tareas = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
]

describe('calcularResumenVista', () => {
  it('calcula el resumen sin filtros', () => {
    expect(calcularResumenVista(tareas, tareas)).toEqual({
      total: 3,
      visibles: 3,
      ocultas: 0,
      porcentajeVisible: 100,
    })
  })

  it('calcula resultados filtrados', () => {
    expect(calcularResumenVista(tareas, [tareas[0]])).toEqual({
      total: 3,
      visibles: 1,
      ocultas: 2,
      porcentajeVisible: 33,
    })
  })

  it('maneja búsquedas sin coincidencias', () => {
    expect(calcularResumenVista(tareas, [])).toEqual({
      total: 3,
      visibles: 0,
      ocultas: 3,
      porcentajeVisible: 0,
    })
  })

  it('evita divisiones entre cero', () => {
    expect(calcularResumenVista([], []).porcentajeVisible).toBe(0)
  })

  it('no modifica los arreglos originales', () => {
    const copia = [...tareas]

    calcularResumenVista(tareas, [tareas[0]])

    expect(tareas).toEqual(copia)
  })
})
