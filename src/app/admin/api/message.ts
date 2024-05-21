import { z } from 'zod'

import { encodeFileToBase64 } from '@/lib/utils'
import { axiosInstance } from '@/services/AxiosClient'

import { schemaFormModeloMensagens } from '../schemas/SchemaMensagemAlunos'

export interface EnvioMensagemWhatsappProps {
  numeroWhatsapp: string
  mensagem: string
}

export interface EnvioMensagemAnexoWhatsappProps {
  numeroWhatsapp: string
  mensagem: string
  anexo: File | string
}

export async function dispararMensagemAnexoWhatsApp({
  numeroWhatsapp,
  mensagem,
  anexo,
}: EnvioMensagemAnexoWhatsappProps) {
  const anexoBase64 = await encodeFileToBase64(anexo)

  const response = await axiosInstance.post('mensagem/whatsapp/anexo/enviar', {
    numeroWhatsapp,
    mensagem,
    anexo: anexoBase64,
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
