'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useGerarRelatorioPDF } from '@/hooks/use-relatorios'
import type { RelatorioAluno } from '@/api/relatorios'

interface RelatorioViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  relatorio: RelatorioAluno | null
  onEditar?: () => void
}

export function RelatorioViewerDialog({
  open,
  onOpenChange,
  relatorio,
  onEditar,
}: RelatorioViewerDialogProps) {
  const { mutate: gerarPDF, isPending } = useGerarRelatorioPDF()

  if (!relatorio) return null

  const handleDownloadPDF = () => {
    gerarPDF(
      {
        idRelatorio: relatorio.id,
        nomeAluno: relatorio.aluno.nome,
      },
      {
        onSuccess: () => {
          toast.success('PDF do relatório baixado com sucesso!')
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.mensagem || 'Erro ao gerar PDF do relatório')
        },
      }
    )
  }

  const tipoPeriodoLabel = {
    mensal: 'Mensal',
    bimestral: 'Bimestral',
    trimestral: 'Trimestral',
    semestral: 'Semestral',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{relatorio.aluno.nome}</DialogTitle>
              <DialogDescription className="text-base mt-1">
                RA: {relatorio.aluno.ra} • {relatorio.aluno.turma.nome}
              </DialogDescription>
            </div>
            <Badge
              variant={
                relatorio.tipoPeriodo === 'bimestral'
                  ? 'default'
                  : relatorio.tipoPeriodo === 'trimestral'
                    ? 'secondary'
                    : 'outline'
              }
              className="ml-2"
            >
              {tipoPeriodoLabel[relatorio.tipoPeriodo]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informações do Período */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Período:</span>
                <span className="font-medium">
                  {relatorio.periodo}º {tipoPeriodoLabel[relatorio.tipoPeriodo]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Professor:</span>
                <span className="font-medium">{relatorio.professor.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data de criação:</span>
                <span className="font-medium">
                  {format(new Date(relatorio.criadoEm), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Conteúdo do Relatório */}
          <div>
            <h3 className="mb-3 font-semibold">Relatório de Desempenho</h3>
            <div className="rounded-lg border bg-background p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {relatorio.conteudo}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button
            variant="secondary"
            onClick={handleDownloadPDF}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </>
            )}
          </Button>
          {onEditar && (
            <Button onClick={onEditar}>Editar Relatório</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
