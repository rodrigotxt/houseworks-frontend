// lib/axiosClient.ts
'use client'; // Se for usado apenas em Client Components

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para enviar cookies (como o JWT) em requisições cross-origin
});

// Opcional: Adicione interceptores para tratamento global de requisições/respostas
axiosClient.interceptors.request.use(
  (config) => {
    // Exemplo: Adicionar um token de autorização (se você tivesse um token no localStorage, por exemplo)
    // const token = localStorage.getItem('access_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Exemplo: Tratar erros 401 (Não autorizado) globalmente
    if (error.response?.status === 401) {
      console.error('Sessão expirada ou não autorizada. Redirecionando para login...');
      // Redirecionar para a página de login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;