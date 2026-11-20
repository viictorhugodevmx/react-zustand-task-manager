export const obtenerFechaLocal = (fecha = new Date()) => {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

export const validarTarea = (
  tarea,
  fechaActual = obtenerFechaLocal(),
) => {
  const errores = {}
  const titulo = tarea.titulo.trim()

  if (!titulo) {
    errores.titulo = 'El título es obligatorio.'
  } else if (titulo.length < 3) {
    errores.titulo = 'El título debe tener al menos 3 caracteres.'
  } else if (titulo.length > 80) {
    errores.titulo = 'El título no puede superar 80 caracteres.'
  }

  if (tarea.descripcion.length > 300) {
    errores.descripcion = 'La descripción no puede superar 300 caracteres.'
  }

  if (!['baja', 'media', 'alta'].includes(tarea.prioridad)) {
    errores.prioridad = 'Selecciona una prioridad válida.'
  }

  if (tarea.fechaLimite && tarea.fechaLimite < fechaActual) {
    errores.fechaLimite = 'La fecha límite no puede ser anterior a hoy.'
  }

  return errores
}
