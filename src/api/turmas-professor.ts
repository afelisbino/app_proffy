import { axiosInstance } from '@/lib/AxiosClient'
import {
  AtualizarVinculosResponse,
  AtualizarVinculosTurmasProfessorProps,
  DesvincularResponse,
  DesvincularTurmaProfessorProps,
  ListarTurmasProfessorProps,
  ListarVinculosResponse,
  MinhasTurmasResponse,
  VincularResponse,
  VincularTurmaProfessorProps,
} from '@/schemas/turmas-professor'

export async function listarVinculos(
  params?: ListarTurmasProfessorProps,
): Promise<ListarVinculosResponse> {
  const queryParams = new URLSearchParams()
  if (params?.idProfessor) queryParams.append('idProfessor', params.idProfessor)
  if (params?.idTurma) queryParams.append('idTurma', params.idTurma)

  const response = await axiosInstance.get<ListarVinculosResponse>(
    `/turmas-professor/listar?${queryParams}`,
  )
  return response.data
}

export async function vincularTurma(
  data: VincularTurmaProfessorProps,
): Promise<VincularResponse> {
  const response = await axiosInstance.post<VincularResponse>(
    '/turmas-professor/vincular',
    data,
  )
  return response.data
}

export async function desvincularTurma(
  data: DesvincularTurmaProfessorProps,
): Promise<DesvincularResponse> {
  const response = await axiosInstance.delete<DesvincularResponse>(
    '/turmas-professor/desvincular',
    { data },
  )
  return response.data
}

export async function atualizarVinculos(
  data: AtualizarVinculosTurmasProfessorProps,
): Promise<AtualizarVinculosResponse> {
  const response = await axiosInstance.put<AtualizarVinculosResponse>(
    '/turmas-professor/atualizar-vinculos',
    data,
  )
  return response.data
}

export async function buscarMinhasTurmas(): Promise<MinhasTurmasResponse> {
  const response = await axiosInstance.get<MinhasTurmasResponse>(
    '/turmas-professor/minhas-turmas',
  )
  return response.data
}
