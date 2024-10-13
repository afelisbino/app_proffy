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

const anoAtualLancamento = new Date().getFullYear()

export default function DiarioClasse() {
  const searchParams = useSearchParams()
  const idTurma = searchParams.get('turma')

  const disciplinas = useQuery({
    queryKey: ['disciplinasEscola'],
    queryFn: buscarListaDisciplinas,
    enabled: !!idTurma,
  })

  const lancamentos = useQuery({
    queryKey: ['lancamentosNotaTurma', idTurma ?? ''],
    queryFn: () =>
      ListarLancamentoNotasTurma({
        idTurma: idTurma ?? '',
        ano: String(anoAtualLancamento),
      }),
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
        {idTurma || idTurma !== '' ? (
          <TabelaDiarioClasse
            listaDisciplinas={disciplinas.data ?? []}
            data={lancamentos?.data?.dados ?? []}
            idTurma={idTurma ?? ''}
            isLoading={lancamentos.isLoading}
          />
        ) : (
          <div className="flex-1 justify-center items-center">
            <p className="leading-none text-lg">
              Necessário selecionar um turma para visualizar ou realizar
              lançamentos de notas
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
