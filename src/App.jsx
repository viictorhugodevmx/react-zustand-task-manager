import { useState } from 'react'

import Header from './components/layout/Header'
import StatsPanel from './components/stats/StatsPanel'
import TaskFilters from './components/filters/TaskFilters'
import TaskList from './components/tasks/TaskList'
import TaskForm from './components/forms/TaskForm'

import { calcularEstadisticas } from './utils/calcularEstadisticas'

import './App.css'

const tareasIniciales = [
  {
    id: 1,
    titulo: 'Preparar entrevista técnica',
    descripcion: 'Repasar fundamentos de React.',
    estado: 'pendiente',
    prioridad: 'alta',
    fechaLimite: '',
  },
  {
    id: 2,
    titulo: 'Estudiar Zustand',
    descripcion: 'Comprender stores, acciones y selectores.',
    estado: 'en-progreso',
    prioridad: 'media',
    fechaLimite: '',
  },
  {
    id: 3,
    titulo: 'Revisar componentes React',
    descripcion: '',
    estado: 'completada',
    prioridad: 'baja',
    fechaLimite: '',
  },
]

const siguientesEstados = {
  pendiente: 'en-progreso',
  'en-progreso': 'completada',
  completada: 'completada',
}

const App = () => {
  const [tareas, setTareas] = useState(tareasIniciales)
  const [formularioAbierto, setFormularioAbierto] = useState(false)

  const estadisticas = calcularEstadisticas(tareas)

  const abrirFormulario = () => setFormularioAbierto(true)
  const cerrarFormulario = () => setFormularioAbierto(false)

  const agregarTarea = (datos) => {
    const nuevaTarea = {
      ...datos,
      id: crypto.randomUUID(),
      estado: 'pendiente',
    }

    setTareas((anteriores) => [...anteriores, nuevaTarea])
    cerrarFormulario()
  }

  const cambiarEstado = (id) => {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              estado: siguientesEstados[tarea.estado],
            }
          : tarea,
      ),
    )
  }

  return (
    <main className="app">
      <div className="app__contenedor">
        <Header
          titulo="Task Manager"
          subtitulo="Organiza y gestiona tus tareas"
          onNuevaTarea={abrirFormulario}
        />

        {formularioAbierto && (
          <TaskForm
            onCerrar={cerrarFormulario}
            onGuardar={agregarTarea}
          />
        )}

        <StatsPanel estadisticas={estadisticas} />

        <TaskFilters />

        <TaskList
          tareas={tareas}
          onCambiarEstado={cambiarEstado}
        />
      </div>
    </main>
  )
}

export default App
