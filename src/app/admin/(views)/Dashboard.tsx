'use client'

import { useQuery } from '@tanstack/react-query'
import { MessageSquareWarning, Percent, Users } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { buscaEstatisticasEscola } from '../api/relatorios'
import { buscarTurmas } from '../api/turma'
import { ChartAvalicoesTurma } from '../components/charts/avaliativa/NotasTurma'
import { ChartFrequenciaTurma } from '../components/charts/frequencia/FrequenciaPorTurma'

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
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-3 space-x-0 md:space-y-0 md:space-x-3">
        <div>
          <Card className="border-l-4 border-l-app-green-500 shadow">
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
          <Card className="border-l-4 border-l-app-green-500 shadow">
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
                    {estatisticasEscola.data?.frequenciaAtual.toFixed(2) ?? 0}
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
      <div className="grid grid-cols-1 lg:grid-cols-12 space-y-3 space-x-0 lg:space-x-3 lg:space-y-0">
        <div className="lg:col-span-6">
          <ChartAvalicoesTurma
            buscandoTurmas={carregandoTurmas}
            listaTurmas={listaTurmas ?? []}
          />
        </div>
        <div className="lg:col-span-6">
          <ChartFrequenciaTurma
            listaTurmas={listaTurmas ?? []}
            buscandoTurmas={carregandoTurmas}
          />
        </div>
      </div>
    </div>
  )
}
