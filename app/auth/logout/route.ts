import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/cookies';

export async function POST() {
  // Remover o cookie de autenticação
  const response = NextResponse.json({ message: 'Logout bem-sucedido' }, { status: 200 });
  removeAuthCookie(); // removeAuthCookie manipula o cookie na resposta do servidor
  return response;
}