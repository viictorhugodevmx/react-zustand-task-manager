import { create } from 'zustand'
import { tareasIniciales } from '../data/tareasIniciales'

const siguientesEstados = {
  pendiente: 'en-progreso',
  'en-progreso': 'completada',
  completada: 'completada',
}

export const useTareasStore = create((set, get) => ({
  tareas: [],

  cargarTareasIniciales: () => {
    set({
      tareas: tareasIniciales.map((tarea) => ({ ...tarea })),
    })
  },

  agregarTarea: (datos) => {
    const nuevaTarea = {
      ...datos,
      id: crypto.randomUUID(),
      estado: 'pendiente',
    }

    set((estado) => ({
      tareas: [...estado.tareas, nuevaTarea],
    }))
  },

  cambiarEstado: (id) => {
    set((estado) => ({
      tareas: estado.tareas.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              estado: siguientesEstados[tarea.estado],
            }
          : tarea,
      ),
    }))
  },

  obtenerTotal: () => get().tareas.length,
}))
