import { z } from 'zod'

// Interfaces de Request
export interface VincularTurmaProfessorProps {
  idTurma: string
  idProfessor: string
}

export interface DesvincularTurmaProfessorProps {
  idTurma: string
  idProfessor: string
}

export interface AtualizarVinculosTurmasProfessorProps {
  idProfessor: string
  idsTurmas: string[]
}

export interface ListarTurmasProfessorProps {
  idProfessor?: string
  idTurma?: string
}

// Interfaces de Response
export interface MinhasTurmasResponse {
  turmas: Array<{
    id: string
    nome: string
  }>
}

export interface TurmaProfessorVinculo {
  id: string
  idTurma: string
  nomeTurma: string
  idProfessor: string
  nomeProfessor: string
  emailProfessor: string
}

export interface VincularResponse {
  mensagem: string
  vinculo: {
    id: string
    turma: {
      id: string
      nome: string
    }
    professor: {
      id: string
      nome: string
      email: string
    }
  }
}

export interface DesvincularResponse {
  mensagem: string
}

export interface ListarVinculosResponse {
  vinculos: TurmaProfessorVinculo[]
}

export interface AtualizarVinculosResponse {
  mensagem: string
  resultado: {
    totalAdicionados: number
    totalRemovidos: number
    totalMantidos: number
    totalVinculos: number
    turmasAdicionadas: Array<{
      id: string
      nome: string
    }>
  }
}

// Schemas Zod
export const schemaVincularTurma = z.object({
  idTurma: z.string().uuid('ID da turma inválido'),
  idProfessor: z.string().uuid('ID do professor inválido'),
})

export const schemaAtualizarVinculos = z.object({
  idProfessor: z.string().uuid('ID do professor inválido'),
  idsTurmas: z.array(z.string().uuid('ID da turma inválido')).min(1, 'Selecione ao menos uma turma'),
})

export type VincularTurmaFormData = z.infer<typeof schemaVincularTurma>
export type AtualizarVinculosFormData = z.infer<typeof schemaAtualizarVinculos>
