import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Feedback from './Feedback';
import './Juego.css';

function Juego() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nombre } = location.state || {};

  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [adivinanza, setAdivinanza] = useState('');
  const [intentos, setIntentos] = useState([]);
  const [adivinado, setAdivinado] = useState(false);
  const [mostrandoNumero, setMostrandoNumero] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    reiniciarJuego();
  }, []);

  const reiniciarJuego = () => {
    setNumeroAleatorio(Math.floor(Math.random() * 100) + 1);
    setAdivinanza('');
    setIntentos([]);
    setAdivinado(false);
    setMostrandoNumero(false);
    setMensaje('');
  };

  const manejarAdivinanza = (e) => {
    e.preventDefault();
    
    if (adivinanza.trim() === '') {
      setMensaje('Por favor, ingresa un número.');
      return;
    }
    
    const numeroIngresado = parseInt(adivinanza);

    if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 100) {
      setMensaje('Por favor, ingresa un número válido entre 1 y 100.');
      return;
    }

    setIntentos([...intentos, numeroIngresado]);

    if (numeroIngresado === numeroAleatorio) {
      setAdivinado(true);
      setTimeout(() => {
        setMostrandoNumero(true);
        setMensaje(`¡Felicidades, ${nombre}! Adivinaste el número.`);
      }, 500);
    } else {
      setMensaje(numeroIngresado < numeroAleatorio ? 'Muy bajo' : 'Muy alto');
    }

    setAdivinanza('');
  };

  return (
    <div className="juego-container">
      <h1>Bienvenido al juego, {nombre}!</h1>
      <div className="numero-container">
        {adivinado && mostrandoNumero ? (
          <h2>{numeroAleatorio}</h2>
        ) : (
          <h2>¿?</h2>
        )}
      </div>

      <form onSubmit={manejarAdivinanza}>
        <input
          type="number"
          value={adivinanza}
          onChange={(e) => setAdivinanza(e.target.value)}
          placeholder="Ingresa tu adivinanza (1-100)"
        />
        <button type="submit">Adivinar</button>
      </form>

      {!adivinado && intentos.length > 0 && (
        <div>
          {intentos.map((intent, index) => (
            <p key={index}>
              {intent} - {intent < numeroAleatorio ? 'Muy bajo' : 'Muy alto'}
            </p>
          ))}
        </div>
      )}

      <Feedback mensaje={mensaje} />
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={reiniciarJuego}>Reiniciar</button>
    </div>
  );
}

export default Juego;

