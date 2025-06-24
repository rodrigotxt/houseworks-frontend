import { requireAuth } from '@/lib/auth';
import { Box, Typography } from '@mui/material';
export default async function DashboardPage() {
  // Isso vai redirecionar para /login se o usuário não estiver autenticado
  console.log('DashboardPage');
  const auth = await requireAuth();
  const user = auth.user;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Dashboard, {user.email}!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Você está logado e acessou uma página protegida. Seu ID de usuário é: {user.id}.
      </Typography>
      {/* <LogoutButton /> */}
    </Box>
  );
}