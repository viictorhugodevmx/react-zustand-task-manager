const normalizarTexto = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export const buscarTareas = (tareas, busqueda) => {
  const termino = normalizarTexto(busqueda)

  if (!termino) {
    return [...tareas]
  }

  return tareas.filter((tarea) => {
    const titulo = normalizarTexto(tarea.titulo)
    const descripcion = normalizarTexto(tarea.descripcion ?? '')

    return (
      titulo.includes(termino) ||
      descripcion.includes(termino)
    )
  })
}
