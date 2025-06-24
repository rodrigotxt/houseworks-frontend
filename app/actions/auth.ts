// app/actions/auth.ts (Server Action)
'use server';

import { cookies } from 'next/headers';

export async function setAuthCookie(token: string) {
  cookies().set({
    name: 'jwt_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  });
}

/**
 * Remove o cookie de autenticação.
 */
export function removeAuthCookie() {
  cookies().delete('jwt_token');
}