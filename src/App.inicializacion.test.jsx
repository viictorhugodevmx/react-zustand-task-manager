import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from './App'
import { useTareasStore } from './stores/useTareasStore'

describe('Inicialización del store independiente de App', () => {
  it('muestra las tareas iniciales sin cargarlas mediante un efecto', () => {
    expect(useTareasStore.getState().tareas).toHaveLength(3)

    render(<App />)

    expect(
      screen.getByText('Preparar entrevista técnica'),
    ).toBeInTheDocument()
  })

  it('conserva tareas al desmontar y remontar App', () => {
    const { unmount } = render(<App />)

    unmount()

    useTareasStore.getState().agregarTarea({
      titulo: 'Tarea conservada',
      descripcion: 'Comprobar el remontaje',
      prioridad: 'media',
      fechaLimite: '',
    })

    render(<App />)

    expect(
      screen.getByText('Tarea conservada'),
    ).toBeInTheDocument()

    expect(useTareasStore.getState().tareas).toHaveLength(4)
  })
})
