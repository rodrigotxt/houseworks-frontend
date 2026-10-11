// app/(app)/performance/page.tsx

import type { Metadata } from 'next';

import Container from '@mui/material/Container';

import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { requireContext, serverApi } from '@/lib/session/server';

export const metadata: Metadata = { title: 'Desempenho' };

export default async function PerformancePage() {
  const { householdId } = await requireContext();
  const ranking = await (await serverApi()).stats.leaderboard(householdId, { period: 'week' });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Desempenho"
        subtitle={ranking.entries.length + ' membros nesta casa · semana atual'}
      />
      <EmptyState
        title="O placar está sendo montado"
        description="A API já devolve o ranking e as estatísticas. Falta a tela."
      />
    </Container>
  );
}
