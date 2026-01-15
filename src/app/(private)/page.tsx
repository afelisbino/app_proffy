'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, MessageCircleWarning } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { buscarAlunosTurma, verificarChamadaTurmaRealizada } from '@/api/turma'
import { FormChamadaAlunos } from '@/components/forms/Turma/FormChamadaTurma'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { buscaListaFrequenciaTurma } from '@/api/relatorios'
import { TabelaAlunosAusentes } from '@/components/tables/ConfirmacaoChamada/tabela-alunos-ausentes'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { buscarMinhasTurmas } from '@/api/turmas-professor'

export default function PageChamada() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const turmaSelecionada = searchParams.get('turma') ?? ''
  const dataChamadaParam = searchParams.get('data')
  const dataChamada = dataChamadaParam
    ? parse(dataChamadaParam, 'yyyy-MM-dd', new Date())
    : new Date()

  const { data: listaTurmas, isFetching: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscolaChamada'],
    queryFn: buscarMinhasTurmas,
    initialData: {
      turmas: []
    },
  })

  const { data: alunosTurma, isFetching: carregandoAlunos } = useQuery({
    queryKey: ['listaAlunosTurmaNotificacao', turmaSelecionada],
    queryFn: () => buscarAlunosTurma(turmaSelecionada),
    enabled: !!turmaSelecionada,
    initialData: [],
  })

  const atualizarSearchParams = (turma?: string, data?: Date) => {
    const params = new URLSearchParams(searchParams.toString())

    if (turma !== undefined) {
      if (turma) {
        params.set('turma', turma)
      } else {
        params.delete('turma')
      }
    }

    if (data !== undefined) {
      params.set('data', format(data, 'yyyy-MM-dd'))
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSelecionarTurma = (turmaId: string) => {
    atualizarSearchParams(turmaId, dataChamada)
  }

  const handleSelecionarData = (data: Date | undefined) => {
    if (data) {
      atualizarSearchParams(turmaSelecionada, data)
    }
  }

  const verificaChamadaRealizada = useQuery({
    queryKey: ['verifica-chamada-turma', turmaSelecionada, dataChamada],
    queryFn: () => verificarChamadaTurmaRealizada({
      turma: turmaSelecionada,
      dataChamada,
    }),
    enabled: !!turmaSelecionada && !!dataChamada,
    staleTime: Infinity
  })

  const estatisticasHistoricoFrequencia = useQuery({
    queryKey: ['historicoFrequencia', turmaSelecionada, dataChamada],
    queryFn: () => buscaListaFrequenciaTurma({
      idTurma: turmaSelecionada,
      inicio: dataChamada,
      fim: dataChamada
    }),
    enabled: !!turmaSelecionada,
    initialData: []
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chamada diária</CardTitle>
        <CardDescription>
          Área para realizar chamada do dia de cada turma
        </CardDescription>
      </CardHeader>
      <CardContent>

        <div className='space-y-4'>
          <div className="flex flex-col md:flex-row gap-4">
            {carregandoTurmas ? (
              <Skeleton className="h-10 w-full rounded" />
            ) : (
              <Select
                onValueChange={handleSelecionarTurma}
                value={turmaSelecionada}
                disabled={carregandoTurmas}
              >
                <SelectTrigger className="w-full md:flex-1">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Turmas</SelectLabel>
                    {listaTurmas?.turmas?.map((turma) => (
                      <SelectItem key={turma.id} value={turma.id}>
                        {turma.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'max-w-sm md:w-auto justify-start text-left font-normal gap-2',
                    !dataChamada && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon />
                  {dataChamada ? format(dataChamada, "PPP", {
                    locale: ptBR
                  }) : <span>Seleciona uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  className="border rounded-sm"
                  mode="single"
                  selected={dataChamada}
                  onSelect={handleSelecionarData}
                  disabled={(date) => date > new Date()}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={carregandoAlunos || !turmaSelecionada || !dataChamada || verificaChamadaRealizada.isFetching || verificaChamadaRealizada?.data?.chamada}>
                  Realizar chamada
                </Button>
              </DialogTrigger>
              <DialogContent className='w-screen max-h-screen lg:max-w-3xl'>
                <DialogTitle>
                  {`Chamada para a turma ${listaTurmas.turmas.find(turma => turma.id === turmaSelecionada)?.nome}`}
                </DialogTitle>
                <DialogDescription>
                  {`Data da realização da chamada: ${dataChamada ? format(dataChamada, "PPP", {
                    locale: ptBR
                  }) : ''}`}
                </DialogDescription>
                <FormChamadaAlunos
                  turmaId={turmaSelecionada}
                  listaAlunosTurma={alunosTurma}
                  carregandoAlunos={carregandoAlunos}
                  dataChamada={dataChamada}
                />
              </DialogContent>
            </Dialog>
          </div>
          {
            !verificaChamadaRealizada.isFetching && verificaChamadaRealizada?.data?.chamada && (
              <Alert variant={'destructive'}>
                <AlertTitle className='flex flex-row justify-normal items-center gap-2 font-bold'><MessageCircleWarning />{"Atenção!"}</AlertTitle>
                <AlertDescription className='text-sm'>{verificaChamadaRealizada.data.msg}</AlertDescription>
              </Alert>
            )
          }
          <TabelaAlunosAusentes
            data={estatisticasHistoricoFrequencia.data}
            isLoading={estatisticasHistoricoFrequencia.isFetching}
          />
        </div>
      </CardContent>
    </Card>
  )
}
