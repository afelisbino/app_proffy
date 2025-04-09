import { z } from 'zod'

import { axiosInstance } from '@/lib/AxiosClient'
import { MensagemAlunoType, schemaFormModeloMensagens } from '@/schemas/SchemaMensagemAlunos'
import { envioMensagemResponsavelType } from '@/components/message/enviar-mensagem'


export interface EnvioMensagemWhatsappProps {
  mensagem: string
}

export interface EnvioMensagemAnexoWhatsappProps {
  problema: string
}

export async function dispararMensagemAnexoWhatsApp({
  problema,
}: EnvioMensagemAnexoWhatsappProps) {
  const response = await axiosInstance.post('reportar', {
    problema,
  })

  return response.data
}

export async function buscarModelosMensagens() {
  const response = await axiosInstance.get<
    Array<{
      id: string
      assunto: string
      modelo: string
    }>
  >('escola/modelo')

  return response.data
}

export async function adicionarModeloMensagem({
  assunto,
  modelo,
}: z.infer<typeof schemaFormModeloMensagens>) {
  const response = await axiosInstance.post<{
    id: string
    assunto: string
    modelo: string
    idEscola: string
  }>('escola/modelo', {
    assunto,
    modelo,
  })

  return response.data
}

export async function excluirModeloMensagem({ id }: { id: string }) {
  return await axiosInstance.delete(`escola/modelo/${id}`)
}

export async function enviarMensagemWhatsApp({
  idAluno,
  alunos,
  mensagem,
}: envioMensagemResponsavelType) {
  const response = await axiosInstance.post(
    'mensagem/whatsapp/notificar/responsaveis',
    {
      idAluno,
      alunos,
      mensagem,
    },
  )

  return response.data
}

export async function buscarMensagensAluno(idAluno: string) {
  const response = await axiosInstance.get<Array<MensagemAlunoType>>(
    `mensagem/whatsapp/aluno/${idAluno}`,
  )

  return response.data
}
