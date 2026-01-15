'use client'

import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useQuery } from "@tanstack/react-query"
import { buscarAlunosTurma, buscarTurmas } from "@/api/turma"
import { ChartAvalicoesTurma } from "@/components/charts/avaliativa/NotasTurma"
import { ChartFrequenciaTurma } from "@/components/charts/frequencia/FrequenciaPorTurma"
import { GraduationCap, Percent, TrendingUp, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { buscaEstatisticasFrequenciaAlunos } from '@/api/relatorios'
import { BoletimPDFGenerator } from '@/components/relatorios/boletim-pdf-generator'
import { FrequenciaPDFGenerator } from '@/components/relatorios/frequencia-pdf-generator'
import { RelatoriosManager } from '@/components/relatorios/relatorios-manager'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dataAtual = new Date()
  const [idTurma, setIdTurma] = useState<string>(searchParams.get('turma') || '')

  // Sincroniza estado com URL
  useEffect(() => {
    const turmaParam = searchParams.get('turma')
    if (turmaParam && turmaParam !== idTurma) {
      setIdTurma(turmaParam)
    }
  }, [searchParams, idTurma])

  const [date] = useState<DateRange | undefined>({
    from: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
    to: dataAtual,
  })

  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscola'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const { data: alunosTurma, isLoading: carregandoAlunos } = useQuery({
    queryKey: ['alunosTurmaRelatorio', idTurma],
    queryFn: () => buscarAlunosTurma(idTurma),
    enabled: !!idTurma,
  })

  const { data: estatisticasFrequencia } = useQuery({
    queryKey: ['estatisticasFrequenciaTurma', idTurma, date],
    queryFn: () => buscaEstatisticasFrequenciaAlunos({
      inicio: date?.from ?? new Date(),
      fim: date?.to ?? new Date(),
      idTurma: idTurma,
    }),
    enabled: !!idTurma && !!date?.from && !!date?.to,
  })

  // Calcular estatísticas de frequência
  const estatisticasCalculadas = useMemo(() => {
    if (!estatisticasFrequencia || !alunosTurma) {
      return {
        totalAlunos: 0,
        totalFaltas: 0,
        taxaPresenca: 0,
        alunosMaisAusentes: 0,
      }
    }

    const totalAlunos = alunosTurma.length
    const totalFaltas = estatisticasFrequencia.reduce((acc, aluno) => acc + aluno.TotalFaltas, 0)

    // Calcular total de aulas (estimativa baseada no período)
    const diasPeriodo = date?.from && date?.to
      ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
      : 30
    const totalAulasEstimado = Math.ceil(diasPeriodo / 7) * 5 // ~5 aulas por semana
    const totalPresencasPossiveis = totalAulasEstimado * totalAlunos
    const totalPresencas = totalPresencasPossiveis - totalFaltas
    const taxaPresenca = totalPresencasPossiveis > 0
      ? (totalPresencas / totalPresencasPossiveis) * 100
      : 0

    // Alunos com mais de 3 faltas
    const alunosMaisAusentes = estatisticasFrequencia.filter(aluno => aluno.TotalFaltas > 3).length

    return {
      totalAlunos,
      totalFaltas,
      taxaPresenca,
      alunosMaisAusentes,
    }
  }, [estatisticasFrequencia, alunosTurma, date])

  const turmaAtual = useMemo(() => {
    return listaTurmas?.find(turma => turma.id === idTurma)
  }, [listaTurmas, idTurma])

  return (
    <div className="space-y-6">
      {/* Seletor de Turma */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Desempenho</CardTitle>
          <CardDescription>
            Visualize relatórios completos de desempenho acadêmico e frequência dos alunos por turma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {carregandoTurmas ? (
            <Skeleton className="h-10 w-full rounded" />
          ) : (
            <Select
              value={idTurma}
              onValueChange={(value) => {
                setIdTurma(value)
                router.push(`/admin/painel?turma=${value}`)
              }}
            >
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Turmas</SelectLabel>
                  {listaTurmas?.map((turma) => (
                    <SelectItem key={turma.id} value={turma.id}>
                      {turma.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {/* Cards de Estatísticas */}
      {idTurma && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-app-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {carregandoAlunos ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">{estatisticasCalculadas.totalAlunos}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Matriculados em {turmaAtual?.nome ?? 'turma'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {carregandoAlunos ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">
                  {estatisticasCalculadas.taxaPresenca.toFixed(1)}%
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                No período selecionado
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Faltas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {carregandoAlunos ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">{estatisticasCalculadas.totalFaltas}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Faltas registradas no período
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunos Críticos</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {carregandoAlunos ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">{estatisticasCalculadas.alunosMaisAusentes}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Com mais de 3 faltas
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs com Gráficos */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="avaliacoes" className="w-full">
            <TabsList className="grid w-full h-full grid-cols-1 lg:grid-cols-3">
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              <TabsTrigger value="frequencia">Frequência</TabsTrigger>
              <TabsTrigger value="relatorios_desempenho">Relatórios de Desempenho</TabsTrigger>
            </TabsList>

            <TabsContent value="avaliacoes" className="space-y-4">
              <Separator />
              {carregandoTurmas ? (
                <Skeleton className="h-[400px] w-full rounded" />
              ) : (
                <div className='space-y-4'>
                  <ChartAvalicoesTurma idTurma={idTurma} />
                  <div className="rounded-lg border bg-card p-6">
                    <div className="mb-6 space-y-2">
                      <h2 className="text-xl font-semibold">Boletim Escolar</h2>
                      <p className="text-sm text-muted-foreground">
                        Gere um boletim completo com notas por disciplina e análise comparativa entre
                        períodos
                      </p>
                    </div>
                    <BoletimPDFGenerator idTurma={idTurma} />
                  </div>

                </div>
              )}
            </TabsContent>

            <TabsContent value="frequencia" className="space-y-4">
              <Separator />
              {carregandoTurmas ? (
                <Skeleton className="h-[400px] w-full rounded" />
              ) : (
                <div className='space-y-4'>
                  <ChartFrequenciaTurma idTurma={idTurma} />

                  <div className="rounded-lg border bg-card p-6">
                    <div className="mb-6 space-y-2">
                      <h2 className="text-xl font-semibold">Relatório de Frequência</h2>
                      <p className="text-sm text-muted-foreground">
                        Gere um PDF detalhado com o histórico de presença e faltas do aluno em um período
                        específico
                      </p>
                    </div>
                    <FrequenciaPDFGenerator idTurma={idTurma} />
                  </div>

                </div>
              )}
            </TabsContent>

            <TabsContent value="relatorios_desempenho" className="space-y-4">
              <Separator />
              {!idTurma ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium">Selecione uma turma</p>
                    <p className="text-sm text-muted-foreground">
                      Escolha uma turma para gerenciar os relatórios de desempenho
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <RelatoriosManager idTurma={idTurma} />
              )}
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
