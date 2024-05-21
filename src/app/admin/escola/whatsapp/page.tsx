'use client'

import { useQueryClient } from '@tanstack/react-query'

import { ConfiguracaoWhatsappType } from './api/ConfigWhatsapp'
import { FormularioConfiguracaoWhatsapp } from './components/FormConfiguracaoWhatspp'

export default function PageConfigWhatsapp() {
  const queryClient = useQueryClient()

  const configuracaoWhatsapp: ConfiguracaoWhatsappType | undefined =
    queryClient.getQueryData(['configuracaoWhatsapp'])

  return (
    <FormularioConfiguracaoWhatsapp
      configuracaoWhatsapp={configuracaoWhatsapp}
    />
  )
}
