'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, Filter, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useListarRelatorios } from '@/hooks/use-relatorios'
import { buscarAlunosTurma } from '@/api/turma'
import type { FiltrosRelatorios, RelatorioAluno } from '@/api/relatorios'
import { RelatorioFormDialog } from './relatorio-form-dialog'
import { RelatorioViewerDialog } from './relatorio-viewer-dialog'

interface RelatoriosManagerProps {
  idTurma: string
}

export function RelatoriosManager({ idTurma }: RelatoriosManagerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Lê filtros do searchParams
  const filtros: FiltrosRelatorios = {
    idTurma,
    tipoPeriodo: searchParams.get('tipoPeriodo') as any,
    periodo: searchParams.get('periodo') || undefined,
  }
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<RelatorioAluno | null>(null)
  const [dialogFormAberto, setDialogFormAberto] = useState(false)
  const [dialogViewAberto, setDialogViewAberto] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)

  const { data, isLoading } = useListarRelatorios(filtros)
  const { data: alunos, isLoading: isLoadingAlunos } = useQuery({
    queryKey: ['alunos-turma', idTurma],
    queryFn: () => buscarAlunosTurma(idTurma),
    enabled: !!idTurma,
  })

  const handleNovoRelatorio = () => {
    setModoEdicao(false)
    setRelatorioSelecionado(null)
    setDialogFormAberto(true)
  }

  const handleEditarRelatorio = (relatorio: RelatorioAluno) => {
    setModoEdicao(true)
    setRelatorioSelecionado(relatorio)
    setDialogFormAberto(true)
  }

  const handleVisualizarRelatorio = (relatorio: RelatorioAluno) => {
    setRelatorioSelecionado(relatorio)
    setDialogViewAberto(true)
  }

  const handleSucesso = () => {
    setDialogFormAberto(false)
    setDialogViewAberto(false)
    setRelatorioSelecionado(null)
  }

  const atualizarFiltros = (novosFiltros: Partial<FiltrosRelatorios>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Remove filtros vazios
    Object.entries(novosFiltros).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    })
    
    router.push(`?${params.toString()}`)
  }

  const limparFiltros = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('tipoPeriodo')
    params.delete('periodo')
    router.push(`?${params.toString()}`)
  }

  if (!idTurma) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium">Selecione uma turma</p>
          <p className="text-sm text-muted-foreground">
            Escolha uma turma para gerenciar os relatórios de desempenho
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros e Ações */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <Select
            value={filtros.tipoPeriodo || ''}
            onValueChange={(value) => atualizarFiltros({ tipoPeriodo: value as any })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo de período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="bimestral">Bimestral</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
              <SelectItem value="semestral">Semestral</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filtros.periodo || ''}
            onValueChange={(value) => atualizarFiltros({ periodo: value })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((periodo) => (
                <SelectItem key={periodo} value={String(periodo)}>
                  {periodo}º Período
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(filtros.tipoPeriodo || filtros.periodo) && (
            <Button variant="outline" onClick={limparFiltros}>
              Limpar Filtros
            </Button>
          )}
        </div>

        <Button onClick={handleNovoRelatorio}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      {/* Lista de Relatórios */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.relatorios.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhum relatório encontrado</p>
            <p className="text-sm text-muted-foreground">
              Crie um novo relatório para começar
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.relatorios.map((relatorio) => (
            <Card key={relatorio.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{relatorio.aluno.nome}</CardTitle>
                    <CardDescription>
                      {relatorio.aluno.turma.nome} • {relatorio.periodo}º{' '}
                      {relatorio.tipoPeriodo}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      relatorio.tipoPeriodo === 'bimestral'
                        ? 'default'
                        : relatorio.tipoPeriodo === 'trimestral'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {relatorio.tipoPeriodo}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {relatorio.conteudo}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3">
                <div className="flex w-full gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleVisualizarRelatorio(relatorio)}
                  >
                    Visualizar
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditarRelatorio(relatorio)}
                  >
                    Editar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Por {relatorio.professor.nome} •{' '}
                  {format(new Date(relatorio.criadoEm), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <RelatorioFormDialog
        open={dialogFormAberto}
        onOpenChange={setDialogFormAberto}
        relatorio={relatorioSelecionado}
        modoEdicao={modoEdicao}
        onSucesso={handleSucesso}
        alunos={alunos || []}
        isLoadingAlunos={isLoadingAlunos}
      />

      <RelatorioViewerDialog
        open={dialogViewAberto}
        onOpenChange={setDialogViewAberto}
        relatorio={relatorioSelecionado}
        onEditar={() => {
          setDialogViewAberto(false)
          handleEditarRelatorio(relatorioSelecionado!)
        }}
      />
    </div>
  )
}
