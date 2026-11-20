import './TaskReset.css'

const TaskReset = ({ onRestablecer }) => {
  const confirmarRestablecimiento = () => {
    const confirmado = window.confirm(
      '¿Restablecer las tareas originales? Se perderán los cambios actuales.',
    )

    if (!confirmado) return

    onRestablecer()
  }

  return (
    <section className="task-reset" aria-label="Restablecer tareas">
      <p className="task-reset__descripcion">
        Puedes recuperar las tres tareas originales cuando lo necesites.
      </p>

      <button
        className="task-reset__boton"
        type="button"
        onClick={confirmarRestablecimiento}
      >
        Restablecer tareas
      </button>
    </section>
  )
}

export default TaskReset
