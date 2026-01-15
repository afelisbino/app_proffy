import { z } from 'zod'

// ===== TIPOS DE PERÍODO =====

export const tiposPeriodo = ['mensal', 'bimestral', 'trimestral', 'semestral'] as const

// ===== SCHEMA DE RELATÓRIO DE ALUNO =====

export const schemaRelatorio = z.object({
  id: z.string().uuid('ID do relatório inválido').optional(),
  conteudo: z
    .string()
    .min(10, 'O conteúdo deve ter pelo menos 10 caracteres')
    .max(5000, 'O conteúdo não pode ultrapassar 5000 caracteres'),
  periodo: z.string().min(1, 'Período é obrigatório'),
  tipoPeriodo: z.enum(tiposPeriodo, {
    required_error: 'Tipo de período é obrigatório',
  }),
  idAluno: z.string().uuid('ID do aluno inválido').optional(),
  // idProfessor é obtido automaticamente do cookie session-user no backend
})

// Schemas derivados para criar e atualizar (mantidos por compatibilidade)
export const schemaCriarRelatorio = schemaRelatorio.required({ idAluno: true })

export const schemaAtualizarRelatorio = schemaRelatorio.required({ id: true })

// ===== SCHEMA DE FILTROS =====

export const schemaFiltrosRelatorios = z.object({
  idTurma: z.string().uuid().optional(),
  idProfessor: z.string().uuid().optional(),
  periodo: z.string().optional(),
  tipoPeriodo: z.enum(tiposPeriodo).optional(),
})

// ===== SCHEMA DE PDF DE FREQUÊNCIA =====

export const schemaGerarFrequenciaPDF = z
  .object({
    idAluno: z.string().uuid('ID do aluno inválido'),
    dataInicio: z.date({
      required_error: 'Data de início é obrigatória',
      invalid_type_error: 'Data de início inválida',
    }),
    dataFim: z.date({
      required_error: 'Data de fim é obrigatória',
      invalid_type_error: 'Data de fim inválida',
    }),
  })
  .refine(
    (data) => {
      return data.dataInicio <= data.dataFim
    },
    {
      message: 'Data de início não pode ser maior que data de fim',
      path: ['dataFim'],
    }
  )

// ===== SCHEMA DE PDF DE BOLETIM =====

export const schemaGerarBoletimPDF = z.object({
  idAluno: z.string().uuid('ID do aluno inválido'),
  ano: z
    .string()
    .regex(/^\d{4}$/, 'Ano deve ter 4 dígitos')
    .refine(
      (ano) => {
        const anoNum = parseInt(ano)
        return anoNum >= 2000 && anoNum <= 2100
      },
      {
        message: 'Ano inválido (deve estar entre 2000 e 2100)',
      }
    ),
  tipoPeriodo: z.enum(tiposPeriodo, {
    required_error: 'Tipo de período é obrigatório',
  }),
  periodos: z
    .array(z.string())
    .min(1, 'Selecione pelo menos um período')
    .max(12, 'Máximo de 12 períodos'),
})

// ===== TIPOS INFERIDOS =====

export type RelatorioFormData = z.infer<typeof schemaRelatorio>
export type CriarRelatorioFormData = z.infer<typeof schemaCriarRelatorio>
export type AtualizarRelatorioFormData = z.infer<typeof schemaAtualizarRelatorio>
export type FiltrosRelatoriosFormData = z.infer<typeof schemaFiltrosRelatorios>
export type GerarFrequenciaPDFFormData = z.infer<typeof schemaGerarFrequenciaPDF>
export type GerarBoletimPDFFormData = z.infer<typeof schemaGerarBoletimPDF>
