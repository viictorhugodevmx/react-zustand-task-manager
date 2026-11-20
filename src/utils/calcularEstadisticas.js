export const calcularEstadisticas = (tareas) => {
  const contarPorEstado = (estado) =>
    tareas.filter((tarea) => tarea.estado === estado).length

  return [
    {
      id: 'total',
      etiqueta: 'Total',
      valor: tareas.length,
    },
    {
      id: 'pendientes',
      etiqueta: 'Pendientes',
      valor: contarPorEstado('pendiente'),
    },
    {
      id: 'progreso',
      etiqueta: 'En progreso',
      valor: contarPorEstado('en-progreso'),
    },
    {
      id: 'completadas',
      etiqueta: 'Completadas',
      valor: contarPorEstado('completada'),
    },
  ]
}
