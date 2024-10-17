'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MegaphoneOff, Pencil, Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { consultaDadosMatricula } from '@/app/admin/api/matricula'
import { EdicaoMatriculaAlunoDialog } from '@/app/admin/components/dialogs/edicao-matricula-aluno'
import { AdicionaResponsavelAlunoDialog } from '@/app/admin/components/dialogs/novo-responsavel'
import { TabelaReponsaveisAluno } from '@/app/admin/components/tables/Responsaveis/tabela-responsavel'
import { BotaoVoltar } from '@/components/Header/BotaoVoltar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { aplicarMascaraDocumento, mascararNome } from '@/lib/utils'

export default function MatriculaAlunoPage() {
  const params = useParams<{ id: string }>()

  const dadosAluno = useQuery({
    queryKey: ['matriculaAluno', params.id],
    queryFn: () => consultaDadosMatricula(params.id),
  })

  const getDataAniversario = (dataAniversario: Date) => {
    return format(
      new Date(
        dataAniversario.getFullYear(),
        dataAniversario.getMonth(),
        dataAniversario.getDate() + 1,
      ),
      'PP',
      {
        locale: ptBR,
      },
    )
  }

  return (
    <section className="space-y-2">
      <BotaoVoltar descricao="Retornar para a listagem de turmas" />
      {dadosAluno.data?.dados?.notificacaoBloqueado && (
        <Alert className="bg-app-red-800 text-app-white-100 border-0 space-x-2 shadow-lg">
          <MegaphoneOff color="#ffffff" className="size-5" />
          <AlertTitle>Notificações bloqueadas</AlertTitle>
          <AlertDescription>
            {`As notificações relacionadas à este aluno estão bloqueadas.`}
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Dados da matrícula</CardTitle>
            <CardDescription>Detalhes da matrícula do aluno</CardDescription>
          </div>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    size={'default'}
                    variant={'default'}
                    className="shadow"
                    disabled={!dadosAluno.data || dadosAluno.isLoading}
                  >
                    <Pencil className="size-5 hidden md:flex" />
                    <span className="flex md:hidden">Editar</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar dados da matrícula</p>
              </TooltipContent>
            </Tooltip>
            <EdicaoMatriculaAlunoDialog
              idAluno={dadosAluno.data?.dados?.id ?? ''}
              nomeAluno={dadosAluno.data?.dados?.nome ?? ''}
              dataNascimento={
                dadosAluno.data && dadosAluno.data.dados
                  ? new Date(dadosAluno.data.dados.dataNascimento)
                  : new Date()
              }
              cpfAluno={dadosAluno.data?.dados?.cpf ?? ''}
              rgAluno={dadosAluno.data?.dados?.rg ?? ''}
              raAluno={dadosAluno.data?.dados?.ra ?? ''}
            />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div>
                <label className="block text-xs">Nome:</label>
                {dadosAluno.isLoading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <span className="mt-1 text-lg font-bold">
                    {mascararNome(dadosAluno.data?.dados?.nome ?? '')}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs">CPF:</label>
                {dadosAluno.isLoading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <span className="mt-1 text-lg font-bold">
                    {aplicarMascaraDocumento(dadosAluno.data?.dados?.cpf ?? '')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div>
                <label className="block text-xs">RG:</label>
                {dadosAluno.isLoading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <span className="mt-1 text-lg font-bold">
                    {dadosAluno.data?.dados?.rg}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs">RA:</label>
                {dadosAluno.isLoading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <span className="mt-1 text-lg font-bold">
                    {dadosAluno.data?.dados?.ra}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs">Dt. Nascimento</label>
                {dadosAluno.isLoading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <span className="mt-1 text-lg font-bold capitalize">
                    {dadosAluno.data &&
                      dadosAluno.data.dados &&
                      getDataAniversario(
                        dadosAluno.data && dadosAluno.data.dados
                          ? new Date(dadosAluno.data.dados.dataNascimento)
                          : new Date(),
                      )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Responsáveis do aluno</CardTitle>
            <CardDescription>
              Lista de responsáveis do aluno, incluindo parentes e
              representantes
            </CardDescription>
          </div>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    size={'default'}
                    variant={'default'}
                    className="shadow"
                    disabled={!dadosAluno.data || dadosAluno.isLoading}
                  >
                    <Plus className="size-5 hidden md:flex" />
                    <span className="flex md:hidden">
                      Adicionar responsável
                    </span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar responsável e vincular na matricula do aluno</p>
              </TooltipContent>
            </Tooltip>
            <AdicionaResponsavelAlunoDialog
              idAluno={dadosAluno.data?.dados?.id ?? ''}
            />
          </Dialog>
        </CardHeader>
        <CardContent>
          <TabelaReponsaveisAluno
            carregandoLista={dadosAluno.isLoading}
            listaResponsaveis={
              dadosAluno.data?.dados?.ResponsavelAluno.map((responsavel) => {
                return {
                  idAluno: dadosAluno.data.dados?.id,
                  id: responsavel.responsavel.id,
                  nome: responsavel.responsavel.nome,
                  cpf: responsavel.responsavel.cpf,
                  TelefoneResponsavel:
                    responsavel.responsavel.TelefoneResponsavel,
                }
              }) ?? []
            }
          />
        </CardContent>
      </Card>
    </section>
  )
}
