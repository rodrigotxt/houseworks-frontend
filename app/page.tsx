// frontend/app/page.tsx

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth'; // Importe sua função do servidor

export default async function HomePage() {
  const user = await getCurrentUser(); // Verifica se o usuário está logado
  
  if (user) {
    // Se o usuário está logado, redireciona para o dashboard
    redirect('/dashboard');
  } else {
    // Se o usuário NÃO está logado, redireciona para a página de login
    redirect('/login'); // Ou '/auth/login' se essa for a sua rota de login
  }

  // Este código abaixo não será executado, mas é bom ter um fallback
  return (
    <h1>Redirecionando...</h1>
  );
}