import { useState } from 'react'

import { validarTarea } from '../../utils/validarTarea'

import './TaskForm.css'

const valoresIniciales = {
  titulo: '',
  descripcion: '',
  prioridad: 'media',
  fechaLimite: '',
}

const TaskForm = ({ onCerrar, onGuardar }) => {
  const [formulario, setFormulario] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: undefined,
    }))
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const nuevosErrores = validarTarea(formulario)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const tareaNormalizada = {
      ...formulario,
      titulo: formulario.titulo.trim(),
      descripcion: formulario.descripcion.trim(),
    }

    onGuardar(tareaNormalizada)
  }

  return (
    <section
      className="task-form"
      aria-labelledby="task-form-titulo"
    >
      <div className="task-form__encabezado">
        <h2 id="task-form-titulo">Nueva tarea</h2>

        <button
          type="button"
          className="task-form__cerrar"
          onClick={onCerrar}
          aria-label="Cerrar formulario"
        >
          ×
        </button>
      </div>

      <p className="task-form__descripcion">
        Completa la información de tu nueva tarea.
      </p>

      <form onSubmit={manejarEnvio} noValidate>
        <div className="task-form__campos">
          <div className="task-form__campo">
            <label htmlFor="tarea-titulo">Título *</label>

            <input
              id="tarea-titulo"
              name="titulo"
              type="text"
              value={formulario.titulo}
              onChange={manejarCambio}
              placeholder="Ej. Repasar React Hooks"
              aria-required="true"
              aria-invalid={Boolean(errores.titulo)}
              aria-describedby={
                errores.titulo ? 'error-titulo' : undefined
              }
            />

            {errores.titulo && (
              <span
                id="error-titulo"
                className="task-form__error"
                role="alert"
              >
                {errores.titulo}
              </span>
            )}
          </div>

          <div className="task-form__campo">
            <label htmlFor="tarea-descripcion">
              Descripción
            </label>

            <textarea
              id="tarea-descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Detalles de la tarea..."
              rows={4}
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={
                errores.descripcion ? 'error-descripcion' : undefined
              }
            />

            {errores.descripcion && (
              <span
                id="error-descripcion"
                className="task-form__error"
                role="alert"
              >
                {errores.descripcion}
              </span>
            )}
          </div>

          <div className="task-form__fila">
            <div className="task-form__campo">
              <label htmlFor="tarea-prioridad">
                Prioridad
              </label>

              <select
                id="tarea-prioridad"
                name="prioridad"
                value={formulario.prioridad}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.prioridad)}
                aria-describedby={
                  errores.prioridad ? 'error-prioridad' : undefined
                }
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>

              {errores.prioridad && (
                <span
                  id="error-prioridad"
                  className="task-form__error"
                  role="alert"
                >
                  {errores.prioridad}
                </span>
              )}
            </div>

            <div className="task-form__campo">
              <label htmlFor="tarea-fecha">
                Fecha límite
              </label>

              <input
                id="tarea-fecha"
                name="fechaLimite"
                type="date"
                value={formulario.fechaLimite}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.fechaLimite)}
                aria-describedby={
                  errores.fechaLimite ? 'error-fecha' : undefined
                }
              />

              {errores.fechaLimite && (
                <span
                  id="error-fecha"
                  className="task-form__error"
                  role="alert"
                >
                  {errores.fechaLimite}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="task-form__acciones">
          <button
            type="button"
            className="task-form__cancelar"
            onClick={onCerrar}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="task-form__validar"
          >
            Guardar tarea
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
