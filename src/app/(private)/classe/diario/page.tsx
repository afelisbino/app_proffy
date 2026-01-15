'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

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
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { buscarListaDisciplinas } from '@/api/escola'
import {
  listaConteudoAulaTurma,
  ListarLancamentoNotasTurma,
} from '@/api/diario_turma'
import { TabelaDiarioClasse } from '@/components/tables/Diario/tabela-diario-classe'
import { TabelaConteudoDiarioClasse } from '@/components/tables/ConteudoAula/tabela-conteudo'
import { buscarMinhasTurmas } from '@/api/turmas-professor'

const dataAtual = new Date()
const anoAtualLancamento = dataAtual.getFullYear()

export default function DiarioTurma() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const turmaSelecionada = searchParams.get('turma') ?? ''

  const { data: turmas, isLoading: isLoadingTurmas } = useQuery({
    queryKey: ['turmas'],
    queryFn: buscarMinhasTurmas,
    initialData: {
      turmas: [],
    },
  })

  const disciplinas = useQuery({
    queryKey: ['disciplinasEscola'],
    queryFn: buscarListaDisciplinas,
  })

  const lancamentosNota = useQuery({
    queryKey: ['lancamentosNotaTurma', turmaSelecionada],
    queryFn: () =>
      ListarLancamentoNotasTurma({
        idTurma: turmaSelecionada,
        ano: String(anoAtualLancamento),
      }),
    enabled: !!turmaSelecionada,
  })

  const lancamentosConteudos = useQuery({
    queryKey: ['lancamentosConteudoAula', turmaSelecionada],
    queryFn: () =>
      listaConteudoAulaTurma({
        idTurma: turmaSelecionada,
        periodo: {
          inicio: new Date(
            dataAtual.getDate(),
            dataAtual.getMonth(),
            dataAtual.getFullYear(),
            0,
            0,
            0,
          ),
          fim: new Date(),
        },
      }),
    enabled: !!turmaSelecionada,
  })

  const handleSelecionarTurma = (turmaId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('turma', turmaId)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades da turma</CardTitle>
        <CardDescription>{`Visualizar todos as notas de atividades realizada em 
        sala de aula de cada aluno, além de visualizar a média da turma em cada 
        disciplina`}</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-2">
            {isLoadingTurmas ? (
              <Skeleton className="h-10 w-full rounded" />
            ) : (
              <Select
                onValueChange={handleSelecionarTurma}
                value={turmaSelecionada}
                disabled={isLoadingTurmas}
              >
                <SelectTrigger className="w-full md:flex-1">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Turmas</SelectLabel>
                    {turmas?.turmas?.map((turma) => (
                      <SelectItem key={turma.id} value={turma.id}>
                        {turma.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Separator />
          <Tabs defaultValue="atividade" className="w-full">
            <TabsList className="grid w-auto md:w-[400px] grid-cols-2">
              <TabsTrigger value="atividade">
                Atividades lecionadas
              </TabsTrigger>
              <TabsTrigger value="avaliacao">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="atividade">
              <TabelaConteudoDiarioClasse
                listaDisciplinas={disciplinas.data ?? []}
                data={lancamentosConteudos?.data ?? []}
                idTurma={turmaSelecionada}
                isLoading={lancamentosConteudos.isFetching}
              />
            </TabsContent>
            <TabsContent value="avaliacao">
              <TabelaDiarioClasse
                listaDisciplinas={disciplinas.data ?? []}
                data={lancamentosNota?.data?.dados ?? []}
                idTurma={turmaSelecionada}
                isLoading={lancamentosConteudos.isFetching}
              />
            </TabsContent>
          </Tabs>
        </section>
      </CardContent>
    </Card>
  )
}