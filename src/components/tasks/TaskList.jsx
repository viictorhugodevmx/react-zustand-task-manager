import TaskCard from './TaskCard'

import './TaskList.css'

const TaskList = ({ tareas, onCambiarEstado, onEditar, onEliminar }) => {
  const hayTareas = tareas.length > 0

  return (
    <section className="tasks" aria-label="Lista de tareas">
      <h2>Mis tareas</h2>

      {hayTareas ? (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              <TaskCard
                tarea={tarea}
                onCambiarEstado={onCambiarEstado}
                onEditar={onEditar}
                onEliminar={onEliminar}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="tasks__vacio" role="status">
          <span className="tasks__vacio-icono" aria-hidden="true">
            ✓
          </span>

          <h3>No hay tareas disponibles</h3>

          <p>Cuando tengas tareas, aparecerán aquí.</p>
        </div>
      )}
    </section>
  )
}

export default TaskList
