// lib/apiClient.ts
'use client'; // Se for usado apenas em Client Components

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
//const API_BASE_URL = 'http://localhost:3001';

interface FetchOptions extends RequestInit {
  // Você pode adicionar opções customizadas aqui, se precisar
}

/**
 * Função utilitária para fazer requisições à API.
 * Adiciona automaticamente a API_BASE_URL.
 * @param endpoint O caminho do endpoint da API (ex: '/auth/login', '/products')
 * @param options Opções para a requisição fetch (method, headers, body, etc.)
 * @returns A Promise da resposta do fetch.
 */
export async function apiClient<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Configura os headers padrão, se não forem fornecidos
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  };

  // Se o método for POST, PUT, PATCH e tiver um body, stringify-o
  if (
    options?.body &&
    (options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH') &&
    !(options.body instanceof FormData) // Não stringify FormData
  ) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    // Trate erros de forma genérica aqui, se quiser
    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(errorData.message || 'Algo deu errado com a requisição.');
  }

  // Retorna o JSON parseado. Se a resposta for vazia (ex: 204 No Content), retorne null ou um objeto vazio.
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json() as T;
  }
  return {} as T; // Retorna um objeto vazio ou null para respostas sem JSON
}