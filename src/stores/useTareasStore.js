import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { tareasIniciales } from '../data/tareasIniciales'

const siguientesEstados = {
  pendiente: 'en-progreso',
  'en-progreso': 'completada',
  completada: 'completada',
}

const copiarTareasIniciales = () =>
  tareasIniciales.map((tarea) => ({ ...tarea }))

export const useTareasStore = create(
  persist(
    (set, get) => ({
      tareas: copiarTareasIniciales(),

      cargarTareasIniciales: () => {
        set({ tareas: copiarTareasIniciales() })
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
        set((estado) => {
          const tareaActual = estado.tareas.find(
            (tarea) => tarea.id === id,
          )

          if (!tareaActual || tareaActual.estado === 'completada') {
            return estado
          }

          return {
            tareas: estado.tareas.map((tarea) =>
              tarea.id === id
                ? {
                    ...tarea,
                    estado: siguientesEstados[tarea.estado],
                  }
                : tarea,
            ),
          }
        })
      },

      obtenerTotal: () => get().tareas.length,
    }),
    {
      name: 'task-manager-tareas',
      storage: createJSONStorage(() => localStorage),
      version: 1,

      partialize: (estado) => ({
        tareas: estado.tareas,
      }),
    },
  ),
)
