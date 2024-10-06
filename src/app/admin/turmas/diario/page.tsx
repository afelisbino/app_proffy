'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ListarLancamentoNotasTurma } from '../../api/diario_turma'
import { buscarListaDisciplinas } from '../../api/escola'
import { TabelaDiarioClasse } from '../../components/tables/Diario/tabela-diario-classe'

export default function DiarioClasse() {
  const searchParams = useSearchParams()
  const idTurma = searchParams.get('turma')

  const disciplinas = useQuery({
    queryKey: ['disciplinasEscola'],
    queryFn: buscarListaDisciplinas,
  })

  const lancamentos = useQuery({
    queryKey: ['lancamentosNotaTurma', idTurma ?? ''],
    queryFn: () =>
      ListarLancamentoNotasTurma({ idTurma: idTurma ?? '', ano: '2024' }),
    enabled: !!idTurma,
  })

  return (
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
          idTurma={idTurma ?? ''}
          isLoading={lancamentos.isLoading}
        />
      </CardContent>
    </Card>
  )
}
