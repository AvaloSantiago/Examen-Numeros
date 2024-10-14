import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const nombreInput = useRef(null);
  const navigate = useNavigate();

  const handleStartGame = (e) => {
    e.preventDefault();
    const nombre = nombreInput.current.value.trim();
    
    if (nombre !== '') {
      navigate('/juego', { state: { nombre } });
    }
  };

  return (
    <div>
      <h1>Bienvenido al juego!</h1>
      <form onSubmit={handleStartGame}>
        <label>Ingresa tu nombre:</label>
        <input type="text" ref={nombreInput} />
        <button type="submit">Comenzar Juego</button>
      </form>
    </div>
  );
}

export default Inicio;
