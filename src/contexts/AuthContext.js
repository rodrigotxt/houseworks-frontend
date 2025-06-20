// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirecionar

// Cria o contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Pega token do localStorage
  const [user, setUser] = useState(null); // Informações do usuário
  const navigate = useNavigate();

  // Configura o token no cabeçalho padrão do Axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      // Opcional: Decodificar o token para obter info do usuário se necessário,
      // ou fazer uma requisição para uma rota de /api/auth/me
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  // Função de Login
  const login = async (identifier, password) => {
    try {
      const res = await axios.post('/api/auth/login', { identifier, password });
      const receivedToken = res.data.token;
      setToken(receivedToken);
      localStorage.setItem('token', receivedToken); // Salva no localStorage
      // Opcional: Decodificar o token ou buscar informações do usuário
      navigate('/tasks'); // Redireciona para a página de tarefas após o login
    } catch (err) {
      console.error('Erro ao fazer login:', err.response?.data?.message || err.message);
      throw new Error(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  // Função de Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
