'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RelatoriosManager } from '@/components/relatorios/relatorios-manager'
import { buscarTurmas } from '@/api/turma'
import { buscarMinhasTurmas } from '@/api/turmas-professor'

export default function RelatorioDesempenhoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [idTurma, setIdTurma] = useState<string>(searchParams.get('turma') || '')

  const { data: turmas, isLoading: isLoadingTurmas } = useQuery({
    queryKey: ['turmas'],
    queryFn: buscarMinhasTurmas,
    initialData: {
      turmas: []
    },
  })

  useEffect(() => {
    const turmaParam = searchParams.get('turma')
    if (turmaParam) {
      setIdTurma(turmaParam)
    }
  }, [searchParams])

  const handleTurmaChange = (value: string) => {
    setIdTurma(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('turma', value)
    } else {
      params.delete('turma')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Cabeçalho */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios de Desempenho</h1>
        <p className="text-muted-foreground">
          Gerencie relatórios textuais de desempenho e gere PDFs de frequência e boletins
          escolares
        </p>
      </div>

      {/* Seleção de Turma */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Turma *</label>
          <Select
            value={idTurma}
            onValueChange={handleTurmaChange}
            disabled={isLoadingTurmas}
          >
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              {turmas.turmas?.map((turma) => (
                <SelectItem key={turma.id} value={turma.id}>
                  {turma.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Selecione uma turma para gerenciar relatórios e gerar PDFs dos alunos
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold">Observações do Professor</h2>
          <p className="text-sm text-muted-foreground">
            Crie e edite relatórios textuais sobre o desempenho dos alunos em cada período
          </p>
        </div>
        <RelatoriosManager idTurma={idTurma} />
      </div>
    </div>
  )
}
