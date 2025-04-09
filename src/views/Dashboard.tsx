'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2, MessageSquareWarning, Percent, Users } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'

import { buscaEstatisticasEscola } from '@/api/relatorios'
import { buscarTurmas } from '@/api/turma'
import { ChartAvalicoesTurma } from '@/components/charts/avaliativa/NotasTurma'
import { ChartFrequenciaTurma } from '@/components/charts/frequencia/FrequenciaPorTurma'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const HistoricoFrequencia = dynamic(() => import('./HistoricoFrequencia'), {
  loading: () => (
    <div className="flex justify-center mt-4">
      <Loader2 className="animate-spin" />
    </div>
  ),
  ssr: false,
})

export default function Dashboard() {
  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['listaTurmas'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const estatisticasEscola = useQuery({
    queryKey: ['estatisticasEscola'],
    queryFn: buscaEstatisticasEscola,
    staleTime: Infinity,
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <Card className="border-l-4 border-l-app-blue-100 shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suas turmas</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              {estatisticasEscola.isLoading ? (
                <Skeleton className="w-4 h-6" />
              ) : (
                <span className="text-2xl">
                  {estatisticasEscola.data?.qtdTurmasEscola ?? 0}
                </span>
              )}
            </CardContent>
            <CardFooter>
              {estatisticasEscola.isLoading ? (
                <Skeleton className="w-full" />
              ) : (
                <p>{`Você possui ${estatisticasEscola.data?.totalAlunos ?? 0} aluno(s) matriculado`}</p>
              )}
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="border-l-6 border-l-green-200 shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frequência</CardTitle>
              <Percent />
            </CardHeader>
            <CardContent>
              {estatisticasEscola.isLoading ? (
                <Skeleton className="w-4 h-6" />
              ) : (
                <div className="flex flex-row gap-1 items-baseline">
                  <span className="text-2xl">
                    {estatisticasEscola.data?.frequenciaAtual?.toFixed(2) ?? 0}
                  </span>
                  <span className="text-sm">%</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {estatisticasEscola.isLoading ? (
                <Skeleton className="w-full" />
              ) : (
                <p>{`Foram registrados ${estatisticasEscola.data?.totalFaltasAnoAtual} faltas`}</p>
              )}
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="border-l-4 border-l-app-green-500 shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notificações
              </CardTitle>
              <MessageSquareWarning />
            </CardHeader>
            <CardContent>
              {estatisticasEscola.isLoading ? (
                <Skeleton className="w-4 h-6" />
              ) : (
                <span className="text-2xl">
                  {estatisticasEscola.data?.totalNotificacoesEnviadaMesAtual ??
                    0}
                </span>
              )}
            </CardContent>
            <CardFooter>
              {estatisticasEscola.isLoading ? (
                <Skeleton className="w-full" />
              ) : (
                <p>{`Foram enviadas ${estatisticasEscola.data?.totalNotificacoesEnviadaMesPassado ?? 0} no mês passado.`}</p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <HistoricoFrequencia listaTurmas={listaTurmas ?? []}
          buscandoTurmas={carregandoTurmas} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <ChartAvalicoesTurma
          buscandoTurmas={carregandoTurmas}
          listaTurmas={listaTurmas ?? []}
        />
        <ChartFrequenciaTurma
          listaTurmas={listaTurmas ?? []}
          buscandoTurmas={carregandoTurmas}
        />
      </div>
      
    </div>
  )
}
