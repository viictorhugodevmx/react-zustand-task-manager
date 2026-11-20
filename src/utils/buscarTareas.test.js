import { describe, expect, it } from 'vitest'
import { buscarTareas } from './buscarTareas'

const tareas = [
  {
    id: 1,
    titulo: 'Preparar entrevista técnica',
    descripcion: 'Repasar React',
  },
  {
    id: 2,
    titulo: 'Estudiar Zustand',
    descripcion: 'Manejo de estado global',
  },
  {
    id: 3,
    titulo: 'Practicar JavaScript',
    descripcion: 'Resolver ejercicios de lógica',
  },
]

describe('buscarTareas', () => {
  it('devuelve todas las tareas si la búsqueda está vacía', () => {
    expect(buscarTareas(tareas, '')).toEqual(tareas)
  })

  it('busca por título sin distinguir mayúsculas', () => {
    const resultado = buscarTareas(tareas, 'ZUSTAND')

    expect(resultado.map((tarea) => tarea.id)).toEqual([2])
  })

  it('busca coincidencias dentro de la descripción', () => {
    const resultado = buscarTareas(tareas, 'lógica')

    expect(resultado.map((tarea) => tarea.id)).toEqual([3])
  })

  it('ignora acentos y espacios exteriores', () => {
    const resultado = buscarTareas(tareas, '  TECNICA  ')

    expect(resultado.map((tarea) => tarea.id)).toEqual([1])
  })

  it('devuelve un arreglo vacío cuando no existen coincidencias', () => {
    expect(buscarTareas(tareas, 'Angular')).toEqual([])
  })

  it('no modifica el arreglo original de tareas', () => {
    const copiaOriginal = [...tareas]

    const resultado = buscarTareas(tareas, 'React')

    expect(tareas).toEqual(copiaOriginal)
    expect(resultado).not.toBe(tareas)
  })
})
