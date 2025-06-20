// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Você criaria este componente
import HomePage from './pages/HomePage';   // Você criaria este componente
import TasksPage from './pages/TasksPage'; // Você criaria este componente
import { AuthProvider } from './contexts/AuthContext'; // Para gerenciamento de estado de autenticação

function App() {
  return (
    <Router>
      {/* AuthProvider irá envolver toda a aplicação para fornecer o contexto de autenticação */}
      <AuthProvider>
        <div className="App">
          <h1>Gerenciador de Tarefas Domésticas</h1>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            {/* Adicione mais rotas conforme necessário */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
