// app/(app)/schedule/page.tsx
// Placeholder honesto: diz o que vem, em vez de parecer defeito.

import type { Metadata } from 'next';

import Container from '@mui/material/Container';

import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { getHousehold, requireContext, serverApi } from '@/lib/session/server';
import { defaultWindow } from '@/lib/domain/dates';

export const metadata: Metadata = { title: 'Cronograma' };

export default async function SchedulePage() {
  const { householdId } = await requireContext();
  const api = await serverApi();

  // Só para já exercitar a chamada e conseguir dizer quantas tarefas o dia tem.
  const household = await getHousehold(householdId);
  const janela = defaultWindow(household);
  const { meta } = await api.occurrences.list(householdId, { ...janela, pageSize: 1 });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Cronograma"
        subtitle={'Próximos ' + household.horizonDays + ' dias · ' + meta.total + ' tarefas agendadas'}
      />
      <EmptyState
        title="A agenda está sendo montada"
        description="A API já entrega as ocorrências por dia. Falta a tela: visão semanal, concluir e pular."
      />
    </Container>
  );
}
