import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 1. Validar credenciais (SIMULAÇÃO)
  // Em um ambiente real, você faria uma consulta ao banco de dados aqui.
  if (email === 'user@example.com' && password === 'password123') {
    const userPayload = { id: '123', email: 'user@example.com' };
    const token = generateToken(userPayload);

    // 2. Definir o cookie com o JWT
    const response = NextResponse.json({ message: 'Login bem-sucedido', user: userPayload }, { status: 200 });
    setAuthCookie(token);

    return response;
  } else {
    return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
  }
}