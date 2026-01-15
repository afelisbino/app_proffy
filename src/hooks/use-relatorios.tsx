'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    atualizarRelatorio,
    criarRelatorio,
    gerarBoletimPDF,
    gerarFrequenciaPDF,
    gerarRelatorioPDF,
    listarRelatorios,
    type AtualizarRelatorioRequest,
    type CriarRelatorioRequest,
    type FiltrosRelatorios,
    type GerarBoletimPDFParams,
    type GerarFrequenciaPDFParams,
} from '@/api/relatorios'
import { downloadBlob, formatarNomeBoletimPDF, formatarNomeFrequenciaPDF } from '@/lib/download'

// ===== QUERIES =====

/**
 * Hook para listar relatórios de desempenho
 */
export function useListarRelatorios(filtros?: FiltrosRelatorios) {
  return useQuery({
    queryKey: ['relatorios', filtros],
    queryFn: () => listarRelatorios(filtros),
    enabled: !!filtros?.idTurma,
  })
}

// ===== MUTATIONS =====

/**
 * Hook para criar novo relatório
 */
export function useCriarRelatorio() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarRelatorioRequest) => criarRelatorio(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios'] })
    },
  })
}

/**
 * Hook para atualizar relatório existente
 */
export function useAtualizarRelatorio() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AtualizarRelatorioRequest) => atualizarRelatorio(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios'] })
    },
  })
}

/**
 * Hook para gerar PDF de frequência
 */
export function useGerarFrequenciaPDF() {
  return useMutation({
    mutationFn: async ({
      params,
      nomeAluno,
    }: {
      params: GerarFrequenciaPDFParams
      nomeAluno: string
    }) => {
      const blob = await gerarFrequenciaPDF(params)
      const filename = formatarNomeFrequenciaPDF(nomeAluno, params.dataInicio)
      downloadBlob(blob, filename)
      return blob
    },
  })
}

/**
 * Hook para gerar PDF de boletim
 */
export function useGerarBoletimPDF() {
  return useMutation({
    mutationFn: async ({
      params,
      nomeAluno,
    }: {
      params: GerarBoletimPDFParams
      nomeAluno: string
    }) => {
      const blob = await gerarBoletimPDF(params)
      const filename = formatarNomeBoletimPDF(nomeAluno, params.ano)
      downloadBlob(blob, filename)
      return blob
    },
  })
}

/**
 * Hook para gerar PDF do relatório de desempenho
 */
export function useGerarRelatorioPDF() {
  return useMutation({
    mutationFn: async ({
      idRelatorio,
      nomeAluno,
    }: {
      idRelatorio: string
      nomeAluno: string
    }) => {
      const blob = await gerarRelatorioPDF(idRelatorio)
      const filename = `relatorio-${nomeAluno.toLowerCase().replace(/\s+/g, '-')}.pdf`
      downloadBlob(blob, filename)
      return blob
    },
  })
}
