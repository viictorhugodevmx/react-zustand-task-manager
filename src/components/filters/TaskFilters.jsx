import './TaskFilters.css'

const TaskFilters = () => {
  return (
    <section className="filters" aria-label="Filtros de tareas">
      <input
        type="search"
        placeholder="Buscar tareas..."
        aria-label="Buscar tareas"
      />

      <select aria-label="Filtrar por estado" defaultValue="todos">
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendientes</option>
        <option value="en-progreso">En progreso</option>
        <option value="completada">Completadas</option>
      </select>

      <select aria-label="Filtrar por prioridad" defaultValue="todas">
        <option value="todas">Todas las prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </section>
  )
}

export default TaskFilters
