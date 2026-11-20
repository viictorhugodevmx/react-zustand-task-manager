import { useTareasStore } from '../../stores/useTareasStore'

const ResumenZustand = () => {
  const tareas = useTareasStore((estado) => estado.tareas)

  const agregarTarea = useTareasStore(
    (estado) => estado.agregarTarea,
  )

  const crearTareaEjemplo = () => {
    agregarTarea({
      titulo: 'Practicar selectores',
      descripcion: 'Aprender Zustand con React',
      prioridad: 'media',
      fechaLimite: '',
    })
  }

  return (
    <section aria-label="Laboratorio Zustand">
      <h2>Laboratorio de selectores</h2>

      <p>
        Total de tareas en Zustand: {tareas.length}
      </p>

      <button type="button" onClick={crearTareaEjemplo}>
        Agregar tarea de prueba
      </button>
    </section>
  )
}

export default ResumenZustand
