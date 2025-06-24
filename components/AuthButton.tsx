// components/AuthButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

// Este componente pode ser usado para logout,
// ou para mostrar login/logout dependendo do AuthProvider (ver abaixo)
export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        console.log('Logout bem-sucedido');
        router.push('/login'); // Redireciona para a página de login
        router.refresh(); // Força uma revalidação
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro de rede no logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleLogout}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
    >
      Logout
    </Button>
  );
}