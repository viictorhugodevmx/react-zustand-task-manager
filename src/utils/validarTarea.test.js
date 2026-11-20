import { describe, expect, it } from 'vitest'
import { validarTarea } from './validarTarea'

const tareaValida = {
  titulo: 'Estudiar Zustand',
  descripcion: 'Aprender stores.',
  prioridad: 'alta',
  fechaLimite: '2099-12-31',
}

const fechaActual = '2026-11-19'

describe('validarTarea', () => {
  it('acepta datos correctos', () => {
    expect(validarTarea(tareaValida, fechaActual)).toEqual({})
  })

  it('rechaza un título vacío o con espacios', () => {
    const errores = validarTarea(
      { ...tareaValida, titulo: '   ' },
      fechaActual,
    )

    expect(errores.titulo).toBe('El título es obligatorio.')
  })

  it('comprueba los límites de caracteres', () => {
    const errores = validarTarea(
      {
        ...tareaValida,
        titulo: 'ab',
        descripcion: 'a'.repeat(301),
      },
      fechaActual,
    )

    expect(errores.titulo).toBeDefined()
    expect(errores.descripcion).toBeDefined()
  })

  it('rechaza prioridades incorrectas', () => {
    const errores = validarTarea(
      { ...tareaValida, prioridad: 'urgente' },
      fechaActual,
    )

    expect(errores.prioridad).toBeDefined()
  })

  it('rechaza fechas anteriores al día actual', () => {
    const errores = validarTarea(
      { ...tareaValida, fechaLimite: '2026-11-18' },
      fechaActual,
    )

    expect(errores.fechaLimite).toBeDefined()
  })
})
