'use client'

import { recuperarConfiguracoesExistentes } from '@/api/ConfigWhatsapp'
import { FormularioConfiguracaoWhatsapp } from '@/components/forms/FormConfiguracaoWhatspp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

export default function PageConfigWhatsapp() {

  const configuracaoWhatsapp =
    useQuery({
      queryKey: ['configuracaoWhatsapp'],
      queryFn: recuperarConfiguracoesExistentes,
      initialData: {
        id: '',
        login_api_whatsapp: '',
        token_api_whatsapp: '',
        token_dispositivo_api_whatsapp: '',
      }
    })

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
          configuracaoWhatsapp={configuracaoWhatsapp.data}
        />
      </CardContent>
    </Card>
  )
}
