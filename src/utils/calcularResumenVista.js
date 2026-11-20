export const calcularResumenVista = (tareas, tareasVisibles) => {
  const total = tareas.length
  const visibles = tareasVisibles.length

  return {
    total,
    visibles,
    ocultas: total - visibles,
    porcentajeVisible:
      total === 0 ? 0 : Math.round((visibles / total) * 100),
  }
}
