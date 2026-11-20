import './TaskFilters.css'

const TaskFilters = ({
  estadoSeleccionado,
  prioridadSeleccionada,
  onEstadoChange,
  onPrioridadChange,
}) => {
  return (
    <section
      className="filters"
      aria-label="Filtros de tareas"
    >
      <select
        aria-label="Filtrar por estado"
        value={estadoSeleccionado}
        onChange={(evento) =>
          onEstadoChange(evento.target.value)
        }
      >
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendientes</option>
        <option value="en-progreso">En progreso</option>
        <option value="completada">Completadas</option>
      </select>

      <select
        aria-label="Filtrar por prioridad"
        value={prioridadSeleccionada}
        onChange={(evento) =>
          onPrioridadChange(evento.target.value)
        }
      >
        <option value="todas">Todas las prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </section>
  )
}

export default TaskFilters
