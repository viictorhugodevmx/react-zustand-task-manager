import { useEffect, useState } from 'react'

import Header from './components/layout/Header'
import StatsPanel from './components/stats/StatsPanel'
import TaskFilters from './components/filters/TaskFilters'
import TaskList from './components/tasks/TaskList'
import TaskForm from './components/forms/TaskForm'

import { calcularEstadisticas } from './utils/calcularEstadisticas'
import { useTareasStore } from './stores/useTareasStore'

import './App.css'

const App = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false)

  const tareas = useTareasStore((estado) => estado.tareas)

  const agregarTarea = useTareasStore(
    (estado) => estado.agregarTarea,
  )

  const cambiarEstado = useTareasStore(
    (estado) => estado.cambiarEstado,
  )

  const cargarTareasIniciales = useTareasStore(
    (estado) => estado.cargarTareasIniciales,
  )

  useEffect(() => {
    cargarTareasIniciales()
  }, [cargarTareasIniciales])

  const estadisticas = calcularEstadisticas(tareas)

  const abrirFormulario = () => setFormularioAbierto(true)
  const cerrarFormulario = () => setFormularioAbierto(false)

  const guardarTarea = (datos) => {
    agregarTarea(datos)
    cerrarFormulario()
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
            onGuardar={guardarTarea}
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
