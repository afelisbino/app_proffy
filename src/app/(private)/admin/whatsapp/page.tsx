'use client'

import { ConfiguracaoWhatsappType } from '@/api/ConfigWhatsapp'
import { FormularioConfiguracaoWhatsapp } from '@/components/forms/FormConfiguracaoWhatspp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryClient } from '@tanstack/react-query'


export default function PageConfigWhatsapp() {
  const queryClient = useQueryClient()

  const configuracaoWhatsapp: ConfiguracaoWhatsappType | undefined =
    queryClient.getQueryData(['configuracaoWhatsapp'])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Configuração serviço de mensagens whatsapp
        </CardTitle>
        <CardDescription>
          {'Com as credenciais configurada, o proffy será capaz de disparar mensagens de notificação aos responsaveis dos alunos através de um serviço do whatsapp'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormularioConfiguracaoWhatsapp
          configuracaoWhatsapp={configuracaoWhatsapp}
        />
      </CardContent>
    </Card>
  )
}
