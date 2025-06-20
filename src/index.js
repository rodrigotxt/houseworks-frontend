// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais
import App from './App'; // Seu componente principal App
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Renderiza o componente App */}
  </React.StrictMode>
);

// Se você quiser começar a medir a performance no seu app, passe uma função
// para registrar resultados (ex: reportWebVitals(console.log))
// ou envie para um endpoint de análise. Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
