import { useEffect, useState } from 'react'

import Header from './components/layout/Header'
import StatsPanel from './components/stats/StatsPanel'
import TaskFilters from './components/filters/TaskFilters'
import TaskSearch from './components/search/TaskSearch'
import TaskSort from './components/sort/TaskSort'
import TaskResults from './components/results/TaskResults'
import TaskList from './components/tasks/TaskList'
import TaskForm from './components/forms/TaskForm'

import { calcularEstadisticas } from './utils/calcularEstadisticas'
import { buscarTareas } from './utils/buscarTareas'
import { filtrarTareas } from './utils/filtrarTareas'
import { ordenarTareas } from './utils/ordenarTareas'
import { calcularResumenVista } from './utils/calcularResumenVista'
import { useTareasStore } from './stores/useTareasStore'

import './App.css'

const App = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos')
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState('todas')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('original')

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

  const tareasBuscadas = buscarTareas(tareas, busqueda)

  const tareasFiltradas = filtrarTareas(
    tareasBuscadas,
    estadoSeleccionado,
    prioridadSeleccionada,
  )

  const tareasVisibles = ordenarTareas(
    tareasFiltradas,
    ordenSeleccionado,
  )

  const resumenVista = calcularResumenVista(tareas, tareasVisibles)

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

        <TaskSearch
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
        />

        <TaskFilters
          estadoSeleccionado={estadoSeleccionado}
          prioridadSeleccionada={prioridadSeleccionada}
          onEstadoChange={setEstadoSeleccionado}
          onPrioridadChange={setPrioridadSeleccionada}
        />

        <TaskSort
          ordenSeleccionado={ordenSeleccionado}
          onOrdenChange={setOrdenSeleccionado}
        />

        <TaskResults resumen={resumenVista} />

        <TaskList
          tareas={tareasVisibles}
          onCambiarEstado={cambiarEstado}
        />
      </div>
    </main>
  )
}

export default App
