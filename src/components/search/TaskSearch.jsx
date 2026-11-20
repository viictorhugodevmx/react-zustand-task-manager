import './TaskSearch.css'

const TaskSearch = ({ busqueda, onBusquedaChange }) => {
  return (
    <section
      className="task-search"
      aria-label="Búsqueda de tareas"
    >
      <label
        className="task-search__label"
        htmlFor="buscar-tareas"
      >
        Buscar tareas
      </label>

      <div className="task-search__controles">
        <input
          id="buscar-tareas"
          className="task-search__input"
          type="search"
          placeholder="Buscar por título o descripción..."
          value={busqueda}
          onChange={(evento) =>
            onBusquedaChange(evento.target.value)
          }
        />

        {busqueda && (
          <button
            type="button"
            className="task-search__limpiar"
            onClick={() => onBusquedaChange('')}
          >
            Limpiar
          </button>
        )}
      </div>
    </section>
  )
}

export default TaskSearch
