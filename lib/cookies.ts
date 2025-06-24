'use server';
import { cookies } from 'next/headers';

/**
 * Define um cookie HTTP-only e Secure para o JWT.
 * @param token O token JWT a ser armazenado.
 */
export async function setAuthCookie(token: string) {
  const oneDay = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
  await cookies().set('jwt_token', token, {
    httpOnly: true, // Não acessível via JavaScript no navegador
    secure: process.env.NODE_ENV === 'production', // Apenas via HTTPS em produção
    maxAge: oneDay, // Tempo de vida do cookie (pode ser ajustado para corresponder ao JWT)
    path: '/', // Disponível em todas as rotas
    sameSite: 'lax', // Proteção CSRF
  });
}

/**
 * Remove o cookie de autenticação.
 */
export async function removeAuthCookie() {
  await cookies().delete('jwt_token');
}