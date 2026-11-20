import { useState } from 'react'

import Header from './components/layout/Header'
import StatsPanel from './components/stats/StatsPanel'
import TaskReset from './components/reset/TaskReset'
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
  const [tareaEnEdicionId, setTareaEnEdicionId] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos')
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState('todas')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('original')

  const tareas = useTareasStore((estado) => estado.tareas)
  const agregarTarea = useTareasStore((estado) => estado.agregarTarea)
  const editarTarea = useTareasStore((estado) => estado.editarTarea)
  const eliminarTarea = useTareasStore((estado) => estado.eliminarTarea)
  const cambiarEstado = useTareasStore((estado) => estado.cambiarEstado)
  const cargarTareasIniciales = useTareasStore(
    (estado) => estado.cargarTareasIniciales,
  )

  const tareaEnEdicion = tareas.find(
    (tarea) => tarea.id === tareaEnEdicionId,
  ) ?? null

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

  const abrirFormulario = () => {
    setTareaEnEdicionId(null)
    setFormularioAbierto(true)
  }

  const abrirEdicion = (id) => {
    setTareaEnEdicionId(id)
    setFormularioAbierto(true)
  }

  const cerrarFormulario = () => {
    setFormularioAbierto(false)
    setTareaEnEdicionId(null)
  }

  const guardarTarea = (datos) => {
    if (tareaEnEdicionId !== null) {
      editarTarea(tareaEnEdicionId, datos)
    } else {
      agregarTarea(datos)
    }

    cerrarFormulario()
  }

  const confirmarEliminacion = (id) => {
    const tarea = tareas.find((item) => item.id === id)

    if (!tarea) return

    const confirmado = window.confirm(
      `¿Eliminar la tarea "${tarea.titulo}"? Esta acción no se puede deshacer.`,
    )

    if (!confirmado) return

    eliminarTarea(id)

    if (tareaEnEdicionId === id) {
      cerrarFormulario()
    }
  }

  const restablecerTareas = () => {
    cargarTareasIniciales()
    cerrarFormulario()
    setBusqueda('')
    setEstadoSeleccionado('todos')
    setPrioridadSeleccionada('todas')
    setOrdenSeleccionado('original')
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
            key={tareaEnEdicionId ?? 'nueva'}
            tareaInicial={tareaEnEdicion}
            onCerrar={cerrarFormulario}
            onGuardar={guardarTarea}
          />
        )}

        <StatsPanel estadisticas={estadisticas} />

        <TaskReset onRestablecer={restablecerTareas} />

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
          onEditar={abrirEdicion}
          onEliminar={confirmarEliminacion}
        />
      </div>
    </main>
  )
}

export default App
