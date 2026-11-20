import './Header.css'

const Header = ({ titulo, subtitulo, onNuevaTarea }) => {
  return (
    <header className="header">
      <div>
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
      </div>

      <button
        type="button"
        className="header__boton"
        onClick={onNuevaTarea}
      >
        + Nueva tarea
      </button>
    </header>
  )
}

export default Header
