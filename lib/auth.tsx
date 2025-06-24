// lib/auth.tsx
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//const JWT_SECRET = process.env.JWT_SECRET || 'ba2946fd68bbcd3625dd9a2721de92e18b62858e6549b20d86ed03c162b66ccb';
const JWT_SECRET = '110c5a5a31414b8346cc86a798503b4318bc62f764037ed94dddc71e72989939';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3h';

interface UserPayload {
  id: string;
  email: string;
  username: string;
  name: string;  
}

/**
 * Gera um JWT para o usuário.
 * @param payload Dados do usuário para incluir no token.
 * @returns O token JWT gerado.
 */
export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifica e decodifica um JWT.
 * @param token O token JWT a ser verificado.
 * @returns O payload do token se for válido, ou null se for inválido/expirado.
 */
export function verifyToken(token: string): UserPayload | null {
  try {
    console.log('Verificando token:', token, 'JWT_SECRET:', JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    return decoded;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
}

/**
 * Obtém o JWT do cookie. Deve ser chamado em Server Components ou API Routes.
 * Agora é uma função async para satisfazer a verificação do Next.js.
 * @returns O token JWT ou null.
 */
export async function getJwtFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('jwt_token')?.value || null;
}

/**
 * Função utilitária para obter o usuário logado no servidor.
 * Agora chama getJwtFromCookies com await.
 * @returns Os dados do usuário decodificados do JWT ou null.
 */
export async function getCurrentUser(): Promise<UserPayload | null> { 
  const token = await getJwtFromCookies();
  if (!token) {
    return null;
  }
  return verifyToken(token);
}

/**
 * Redireciona para a página de login se o usuário não estiver autenticado.
 * Agora chama getCurrentUser com await.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}