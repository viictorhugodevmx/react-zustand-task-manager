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

const TaskCard = ({ tarea }) => {
  const {
    titulo,
    descripcion,
    estado,
    prioridad,
  } = tarea

  return (
    <article className="task-card">
      <div className="task-card__contenido">
        <h3>{titulo}</h3>

        {descripcion && (
          <p>{descripcion}</p>
        )}

        <span
          className={`task-card__prioridad task-card__prioridad--${prioridad}`}
        >
          Prioridad: {etiquetasPrioridad[prioridad]}
        </span>
      </div>

      <span
        className={`task-card__estado task-card__estado--${estado}`}
      >
        {etiquetasEstado[estado]}
      </span>
    </article>
  )
}

export default TaskCard
