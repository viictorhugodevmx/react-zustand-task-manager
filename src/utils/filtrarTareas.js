export const filtrarTareas = (
  tareas,
  estadoSeleccionado = 'todos',
  prioridadSeleccionada = 'todas',
) => {
  return tareas.filter((tarea) => {
    const coincideEstado =
      estadoSeleccionado === 'todos' ||
      tarea.estado === estadoSeleccionado

    const coincidePrioridad =
      prioridadSeleccionada === 'todas' ||
      tarea.prioridad === prioridadSeleccionada

    return coincideEstado && coincidePrioridad
  })
}
