'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { ListarLancamentoNotasTurma } from '@/app/admin/api/diario_turma'
import { buscarListaDisciplinas } from '@/app/admin/api/escola'
import { TabelaDiarioClasse } from '@/app/admin/components/tables/Diario/tabela-diario-classe'
import { BotaoVoltar } from '@/components/Header/BotaoVoltar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const anoAtualLancamento = new Date().getFullYear()

export default function DiarioClasse() {
  const turma = useParams<{ id: string }>()

  const disciplinas = useQuery({
    queryKey: ['disciplinasEscola'],
    queryFn: buscarListaDisciplinas,
  })

  const lancamentos = useQuery({
    queryKey: ['lancamentosNotaTurma', turma.id],
    queryFn: () =>
      ListarLancamentoNotasTurma({
        idTurma: turma.id,
        ano: String(anoAtualLancamento),
      }),
  })

  return (
    <div className="space-y-2">
      <BotaoVoltar descricao="Retornar para a listagem de turmas" />
      <Card>
        <CardHeader>
          <CardTitle>Diário de turma</CardTitle>
          <CardDescription>{`Visualizar todos as notas de atividades realizada em 
        sala de aula de cada aluno, além de visualizar a media da turma em cada 
        disciplina`}</CardDescription>
        </CardHeader>
        <CardContent>
          <TabelaDiarioClasse
            listaDisciplinas={disciplinas.data ?? []}
            data={lancamentos?.data?.dados ?? []}
            idTurma={turma.id}
            isLoading={lancamentos.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
