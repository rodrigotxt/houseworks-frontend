// components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { apiClient as apiRequest } from '@/lib/apiClient';
import { setAuthCookie } from '@/lib/cookies';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response : any = await apiRequest('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { email, password },
      });

      if (response.token) {
        console.log('Login bem-sucedido:', response);
        await setAuthCookie(response.token);
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(response?.data?.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      console.error('Erro de rede ou inesperado:', err);
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        mt: 5,
      }}
    >
      <Typography variant="h5" component="h1" sx={{ mb: 2, textAlign: 'center' }}>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </Box>
  );
}