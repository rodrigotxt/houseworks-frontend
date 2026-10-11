// app/(app)/tasks/page.tsx
// A lista de tarefas da casa. Primeira tela real: ela prova a cadeia inteira —
// Server Component -> camada de domínio -> API -> render.

import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import EmptyState from '@/components/ui/EmptyState';
import PageHeader from '@/components/ui/PageHeader';
import { DIFFICULTY_LABELS, describeRecurrence } from '@/lib/domain/labels';
import { requireContext, serverApi } from '@/lib/session/server';

export const metadata: Metadata = { title: 'Tarefas' };

export default async function TasksPage() {
  const { householdId } = await requireContext();

  const { items: tarefas, meta } = await (await serverApi()).tasks.list(householdId, {
    status: 'active',
    pageSize: 100,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Tarefas"
        subtitle={
          meta.total === 0
            ? 'Nada por aqui ainda.'
            : meta.total + (meta.total === 1 ? ' tarefa ativa' : ' tarefas ativas')
        }
      />

      {tarefas.length === 0 ? (
        <EmptyState
          title="Nenhuma tarefa na casa"
          description="Quando alguém criar a primeira tarefa, ela aparece aqui."
        />
      ) : (
        <Stack spacing={1.5}>
          {tarefas.map((tarefa) => (
            <Card key={tarefa.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                    <Typography variant="h6" component="h3">
                      {tarefa.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {describeRecurrence(tarefa.recurrence)}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Chip
                      size="small"
                      label={DIFFICULTY_LABELS[tarefa.difficulty]}
                      variant="outlined"
                    />

                    <Tooltip title="Pontos ao concluir e ser aprovada">
                      <Chip size="small" color="primary" label={tarefa.points + ' pts'} />
                    </Tooltip>

                    <Chip
                      size="small"
                      variant="outlined"
                      label={
                        tarefa.assignedTo
                          ? tarefa.assignedTo.name
                          : tarefa.assignmentStrategy === 'rotate'
                            ? 'Em rodízio'
                            : 'Qualquer um'
                      }
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
