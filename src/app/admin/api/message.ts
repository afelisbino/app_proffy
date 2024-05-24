import { z } from 'zod'

import { encodeFileToBase64 } from '@/lib/utils'
import { axiosInstance } from '@/services/AxiosClient'

import { envioMensagemResponsavelType } from '../components/message/enviar-mensagem'
import {
  MensagemAlunoType,
  schemaFormModeloMensagens,
} from '../schemas/SchemaMensagemAlunos'

export interface EnvioMensagemWhatsappProps {
  mensagem: string
}

export interface EnvioMensagemAnexoWhatsappProps {
  problema: string
  imagem?: File | string
}

export async function dispararMensagemAnexoWhatsApp({
  problema,
  imagem,
}: EnvioMensagemAnexoWhatsappProps) {
  imagem = imagem ? await encodeFileToBase64(imagem) : undefined

  const response = await axiosInstance.post('reportar', {
    problema,
    imagem,
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
