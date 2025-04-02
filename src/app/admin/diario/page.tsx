'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useQuery } from "@tanstack/react-query"
import { buscarTurmas } from "../api/turma"
import ListagemTurmasEscola, {
  useTurmaEscola,
} from '../components/lists/ListagemTurmasEscola'
import { buscarListaDisciplinas } from '../api/escola'
import { listaConteudoAulaTurma, ListarLancamentoNotasTurma } from '../api/diario_turma'
import { TabelaDiarioClasse } from '../components/tables/Diario/tabela-diario-classe'
import { TabelaConteudoDiarioClasse } from '../components/tables/ConteudoAula/tabela-conteudo'

const dataAtual = new Date()
const anoAtualLancamento = dataAtual.getFullYear()

export default function DiarioTurma() {
  const [turmaSelecionada] = useTurmaEscola()

  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscola'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const disciplinas = useQuery({
    queryKey: ['disciplinasEscola'],
    queryFn: buscarListaDisciplinas,
  })

  const lancamentosNota = useQuery({
    queryKey: ['lancamentosNotaTurma', turmaSelecionada.selected],
    queryFn: () =>
      ListarLancamentoNotasTurma({
        idTurma: turmaSelecionada.selected ?? '',
        ano: String(anoAtualLancamento),
      }),
    enabled: !!turmaSelecionada.selected
  })

  const lancamentosConteudos = useQuery({
    queryKey: ['lancamentosConteudoAula', turmaSelecionada.selected],
    queryFn: () =>
      listaConteudoAulaTurma({
        idTurma: turmaSelecionada.selected ?? '',
        periodo: {
          inicio: new Date(dataAtual.getDate(), dataAtual.getMonth(), dataAtual.getFullYear(), 0, 0, 0),
          fim: new Date()
        }
      }),
    enabled: !!turmaSelecionada.selected
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
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-2">
            {carregandoTurmas ? (
              <Skeleton className="h-4 w-full rounded" />
            ) : (
              <ListagemTurmasEscola listaTurmas={listaTurmas ?? []} />
            )}
          </div>
          <Separator />
          <Tabs defaultValue="atividade" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="atividade">Atividades</TabsTrigger>
              <TabsTrigger value="avaliacao">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="atividade">
              <TabelaConteudoDiarioClasse
                listaDisciplinas={disciplinas.data ?? []}
                data={lancamentosConteudos?.data ?? []}
                idTurma={turmaSelecionada.selected ?? ''}
                isLoading={lancamentosConteudos.isFetching}
              />
            </TabsContent>
            <TabsContent value="avaliacao">
              <TabelaDiarioClasse
                listaDisciplinas={disciplinas.data ?? []}
                data={lancamentosNota?.data?.dados ?? []}
                idTurma={turmaSelecionada.selected ?? ''}
                isLoading={lancamentosConteudos.isFetching}
              />
            </TabsContent>
          </Tabs>
        </section>
      </CardContent>
    </Card>
  )
}