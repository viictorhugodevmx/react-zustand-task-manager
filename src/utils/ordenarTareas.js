const valoresPrioridad = {
  alta: 3,
  media: 2,
  baja: 1,
}

export const ordenarTareas = (tareas, criterio = 'original') => {
  const resultado = [...tareas]

  switch (criterio) {
    case 'titulo-asc':
      return resultado.sort((a, b) =>
        a.titulo.localeCompare(b.titulo, 'es', {
          sensitivity: 'base',
        }),
      )

    case 'prioridad-alta':
      return resultado.sort(
        (a, b) =>
          valoresPrioridad[b.prioridad] -
          valoresPrioridad[a.prioridad],
      )

    case 'prioridad-baja':
      return resultado.sort(
        (a, b) =>
          valoresPrioridad[a.prioridad] -
          valoresPrioridad[b.prioridad],
      )

    case 'fecha-asc':
      return resultado.sort((a, b) => {
        if (!a.fechaLimite && !b.fechaLimite) return 0
        if (!a.fechaLimite) return 1
        if (!b.fechaLimite) return -1

        return a.fechaLimite.localeCompare(b.fechaLimite)
      })

    default:
      return resultado
  }
}
