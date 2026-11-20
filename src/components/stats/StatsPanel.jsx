import './StatsPanel.css'

const StatsPanel = ({ estadisticas }) => {
  return (
    <section className="stats" aria-label="Estadísticas de tareas">
      {estadisticas.map((estadistica) => (
        <article className="stats__item" key={estadistica.id}>
          <span>{estadistica.etiqueta}</span>
          <strong>{estadistica.valor}</strong>
        </article>
      ))}
    </section>
  )
}

export default StatsPanel
