import Header from './components/layout/Header'
import StatsPanel from './components/stats/StatsPanel'
import TaskFilters from './components/filters/TaskFilters'
import TaskList from './components/tasks/TaskList'

import { calcularEstadisticas } from './utils/calcularEstadisticas'

import './App.css'

const tareasIniciales = [
  {
    id: 1,
    titulo: 'Preparar entrevista técnica',
    descripcion: 'Repasar fundamentos de React.',
    estado: 'pendiente',
    prioridad: 'alta',
  },
  {
    id: 2,
    titulo: 'Estudiar Zustand',
    descripcion: 'Comprender stores, acciones y selectores.',
    estado: 'en-progreso',
    prioridad: 'media',
  },
  {
    id: 3,
    titulo: 'Revisar componentes React',
    descripcion: '',
    estado: 'completada',
    prioridad: 'baja',
  },
]

const App = () => {
  const estadisticas = calcularEstadisticas(tareasIniciales)

  return (
    <main className="app">
      <div className="app__contenedor">
        <Header
          titulo="Task Manager"
          subtitulo="Organiza y gestiona tus tareas"
        />

        <StatsPanel estadisticas={estadisticas} />

        <TaskFilters />

        <TaskList tareas={tareasIniciales} />
      </div>
    </main>
  )
}

export default App
