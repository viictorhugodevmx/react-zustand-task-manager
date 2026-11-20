import './TaskResults.css'

const TaskResults = ({ resumen }) => {
  return (
    <section
      className="task-results"
      aria-label="Resumen de resultados"
      role="status"
    >
      <p>
        Mostrando <strong>{resumen.visibles}</strong> de{' '}
        <strong>{resumen.total}</strong> tareas
      </p>

      <span>
        {resumen.porcentajeVisible}% visible
      </span>
    </section>
  )
}

export default TaskResults
