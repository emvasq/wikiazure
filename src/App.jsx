import { useState } from 'react';
import './App.css';
import temasAzure from './datos.json';
import preguntasQuiz from './quiz.json';

function App() {
  const [temaActivo, setTemaActivo] = useState(temasAzure[0]);
  const [modo, setModo] = useState('wiki'); // Puede ser 'wiki' o 'quiz'

  // Estados exclusivos para el Quiz
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const manejarRespuesta = (opcionSeleccionada) => {
    if (opcionSeleccionada === preguntasQuiz[preguntaActual].respuestaCorrecta) {
      setPuntaje(puntaje + 1);
    }
    
    const siguientePregunta = preguntaActual + 1;
    if (siguientePregunta < preguntasQuiz.length) {
      setPreguntaActual(siguientePregunta);
    } else {
      setMostrarResultado(true);
    }
  };

  const reiniciarQuiz = () => {
    setPreguntaActual(0);
    setPuntaje(0);
    setMostrarResultado(false);
  };

  return (
    <div className="contenedor-principal">
      <main className="panel-contenido">
        <div className="pantalla-informacion">
          
          {modo === 'wiki' ? (
            // VISTA WIKI TRADICIONAL
            <>
              <h1 className="titulo-tema">{temaActivo.titulo}</h1>
              <div className="texto-explicativo">
                {temaActivo.parrafos.map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))}
              </div>
            </>
          ) : (
            // VISTA DEL QUIZ
            <div className="contenedor-quiz">
              <h1 className="titulo-tema">C:\&gt; EVALUACION_SISTEMA.exe</h1>
              
              {mostrarResultado ? (
                <div className="resultado-quiz">
                  <h2>Evaluación Finalizada</h2>
                  <p>Archivos recuperados: {puntaje} de {preguntasQuiz.length}</p>
                  <button className="boton-retro" onClick={reiniciarQuiz}>[ REINTENTAR ]</button>
                </div>
              ) : (
                <div className="pregunta-quiz">
                  <h2 style={{color: '#ff00ff', marginBottom: '15px'}}>Pregunta {preguntaActual + 1} / {preguntasQuiz.length}</h2>
                  <p className="texto-pregunta">{preguntasQuiz[preguntaActual].pregunta}</p>
                  
                  <div className="opciones-quiz">
                    {preguntasQuiz[preguntaActual].opciones.map((opcion, index) => (
                      <button 
                        key={index} 
                        className="boton-opcion" 
                        onClick={() => manejarRespuesta(opcion)}
                      >
                        {">"} {opcion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <nav className="barra-lateral">
        <h2 className="titulo-wiki">Azure Security</h2>
        
        {/* Botón especial para el Quiz */}
        <button 
          className={modo === 'quiz' ? 'boton-tema activo' : 'boton-tema'}
          onClick={() => setModo('quiz')}
          style={{ marginBottom: '20px', borderBottom: '1px dashed #444', paddingBottom: '15px' }}
        >
          [ TOMAR PRUEBA ]
        </button>

        <ul className="lista-temas">
          {temasAzure.map((tema) => (
            <li key={tema.id}>
              <button 
                className={modo === 'wiki' && temaActivo.id === tema.id ? 'boton-tema activo' : 'boton-tema'}
                onClick={() => {
                  setModo('wiki');
                  setTemaActivo(tema);
                }}
              >
                {tema.titulo}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;