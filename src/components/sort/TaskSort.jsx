import './TaskSort.css'

const TaskSort = ({ ordenSeleccionado, onOrdenChange }) => {
  return (
    <section
      className="task-sort"
      aria-label="Ordenamiento de tareas"
    >
      <label htmlFor="ordenar-tareas">
        Ordenar por
      </label>

      <select
        id="ordenar-tareas"
        value={ordenSeleccionado}
        onChange={(evento) =>
          onOrdenChange(evento.target.value)
        }
      >
        <option value="original">Orden original</option>
        <option value="titulo-asc">Título A–Z</option>
        <option value="prioridad-alta">Prioridad alta primero</option>
        <option value="prioridad-baja">Prioridad baja primero</option>
        <option value="fecha-asc">Fecha más próxima</option>
      </select>
    </section>
  )
}

export default TaskSort
