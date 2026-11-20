import './TaskCard.css'

const etiquetasEstado = {
  pendiente: 'Pendiente',
  'en-progreso': 'En progreso',
  completada: 'Completada',
}

const etiquetasPrioridad = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
}

const TaskCard = ({ tarea, onCambiarEstado }) => {
  const {
    id,
    titulo,
    descripcion,
    estado,
    prioridad,
  } = tarea

  const puedeAvanzar = estado !== 'completada'

  return (
    <article className="task-card">
      <div className="task-card__contenido">
        <h3>{titulo}</h3>

        {descripcion && <p>{descripcion}</p>}

        <span
          className={`task-card__prioridad task-card__prioridad--${prioridad}`}
        >
          Prioridad: {etiquetasPrioridad[prioridad]}
        </span>
      </div>

      <div className="task-card__controles">
        <span
          className={`task-card__estado task-card__estado--${estado}`}
        >
          {etiquetasEstado[estado]}
        </span>

        {puedeAvanzar && onCambiarEstado && (
          <button
            type="button"
            className="task-card__avanzar"
            onClick={() => onCambiarEstado(id)}
            aria-label={`Avanzar estado de ${titulo}`}
          >
            Avanzar estado
          </button>
        )}
      </div>
    </article>
  )
}

export default TaskCard
