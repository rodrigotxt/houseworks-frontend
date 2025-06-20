// frontend/src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Importa o contexto de autenticação

function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // Pode ser email ou username
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Pega a função de login do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password); // Chama a função de login do contexto
      // Redirecionar para a página inicial ou de tarefas após o login bem-sucedido
      // navigation('/tasks'); // Usaria useNavigate do react-router-dom aqui
      console.log('Login bem-sucedido!');
    } catch (error) {
      console.error('Erro no login:', error.message);
      alert('Credenciais inválidas ou erro no servidor.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email ou Username:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
