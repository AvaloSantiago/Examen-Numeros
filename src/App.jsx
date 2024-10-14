import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from '../src/components/Inicio';
import Juego from '../src/components/Juego';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 

ReactDOM.render(<App />, document.getElementById('root'));
