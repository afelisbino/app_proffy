import { axiosInstance } from '@/services/AxiosClient'

export interface ConfiguracoesWhatsappProps {
  id?: string
  senhaApiWhatsapp: string
  loginApiWhatsapp: string
  tokenDispositivoApiWhatsapp: string
}

export type ConfiguracaoWhatsappType = {
  id: string
  login_api_whatsapp: string
  token_api_whatsapp: string
  token_dispositivo_api_whatsapp: string
}

export async function recuperarConfiguracoesExistentes() {
  const response = await axiosInstance.get<ConfiguracaoWhatsappType>(
    'escola/configuracoes/whatsapp',
  )

  return response.data
}

export async function salvarConfiguracoesWhatsapp({
  id,
  senhaApiWhatsapp,
  loginApiWhatsapp,
  tokenDispositivoApiWhatsapp,
}: ConfiguracoesWhatsappProps) {
  const response = await axiosInstance.post(
    'escola/configuracoes/whatsapp',
    {
      password: senhaApiWhatsapp,
      email: loginApiWhatsapp,
      token_dispositivo_api_whatsapp: tokenDispositivoApiWhatsapp,
    },
    {
      params: {
        id,
      },
    },
  )

  return response.data
}
