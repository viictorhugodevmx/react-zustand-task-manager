import { describe, expect, it } from 'vitest'

import { useTareasStore } from './useTareasStore'

const claveStorage = 'task-manager-tareas'

const leerPersistencia = () =>
  JSON.parse(localStorage.getItem(claveStorage))

const tareaEjemplo = {
  titulo: 'Practicar persistencia',
  descripcion: 'Aprender middleware persist',
  prioridad: 'alta',
  fechaLimite: '',
}

describe('Persistencia del store Zustand', () => {
  it('guarda una tarea nueva en localStorage', () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    const datosGuardados = leerPersistencia()

    expect(datosGuardados.version).toBe(1)
    expect(datosGuardados.state.tareas).toHaveLength(4)

    expect(
      datosGuardados.state.tareas[3].titulo,
    ).toBe('Practicar persistencia')
  })

  it('persiste los cambios de estado de una tarea', () => {
    useTareasStore.getState().cambiarEstado(1)

    const datosGuardados = leerPersistencia()

    expect(datosGuardados.state.tareas[0].estado)
      .toBe('en-progreso')
  })

  it('recupera las tareas almacenadas mediante rehydrate', async () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    const respaldo = localStorage.getItem(claveStorage)

    useTareasStore.setState({
      tareas: [],
    })

    expect(useTareasStore.getState().tareas).toHaveLength(0)

    localStorage.setItem(claveStorage, respaldo)

    await useTareasStore.persist.rehydrate()

    const tareasRecuperadas = useTareasStore.getState().tareas

    expect(tareasRecuperadas).toHaveLength(4)

    expect(
      tareasRecuperadas.some(
        (tarea) => tarea.titulo === 'Practicar persistencia',
      ),
    ).toBe(true)
  })

  it('guarda únicamente los datos de las tareas', () => {
    useTareasStore.getState().agregarTarea(tareaEjemplo)

    const datosGuardados = leerPersistencia()

    expect(Object.keys(datosGuardados.state)).toEqual(['tareas'])

    expect(datosGuardados.state.agregarTarea).toBeUndefined()
    expect(datosGuardados.state.cambiarEstado).toBeUndefined()
  })
})
