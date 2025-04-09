'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ConfiguracaoWhatsappType, ConfiguracoesWhatsappProps, salvarConfiguracoesWhatsapp } from '@/api/ConfigWhatsapp'


const schemaFormularioApiWhatsApp = z.object({
  email: z
    .string({
      required_error: 'Necessario informar o login da API',
    })
    .email({
      message: 'Necessário informar um email válido',
    })
    .trim(),
  senha: z
    .string({
      required_error: 'Necessário criar uma senha inicial do usuário',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caractéres',
    }),
  token_dispositivo_api_whatsapp: z
    .string({
      required_error: 'Necessário informar o token do dispositivo da API',
    })
    .trim(),
})

interface FormConfiguracoesProps {
  configuracaoWhatsapp?: ConfiguracaoWhatsappType
}

export function FormularioConfiguracaoWhatsapp({
  configuracaoWhatsapp,
}: FormConfiguracoesProps) {
  const queryClient = useQueryClient()
  const formApiWhatsApp = useForm<z.infer<typeof schemaFormularioApiWhatsApp>>({
    resolver: zodResolver(schemaFormularioApiWhatsApp),
    defaultValues: {
      email: configuracaoWhatsapp?.login_api_whatsapp ?? '',
      senha: '',
      token_dispositivo_api_whatsapp:
        configuracaoWhatsapp?.token_dispositivo_api_whatsapp ?? '',
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarConfiguracoes, isPending } = useMutation({
    mutationFn: ({
      id,
      loginApiWhatsapp,
      senhaApiWhatsapp,
      tokenDispositivoApiWhatsapp,
    }: ConfiguracoesWhatsappProps) =>
      salvarConfiguracoesWhatsapp({
        id,
        loginApiWhatsapp,
        senhaApiWhatsapp,
        tokenDispositivoApiWhatsapp,
      }),
    onError: () => {
      toast.error(
        'Houve um problema ao salvar as configurações, tente novamente!',
      )
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['configuracaoWhatsapp'], {
        id: data.id,
        login_api_whatsapp: data.login_api_whatsapp,
        token_dispositivo_api_whatsapp: data.token_dispositivo_api_whatsapp,
        senha_api_whatsapp: data.senha_api_whatsapp,
      })

      formApiWhatsApp.resetField('senha')
      toast.success('Configurações salvas com sucesso!')
    },
  })

  return (
    <Form {...formApiWhatsApp}>
      <form
        className="space-y-4"
        onSubmit={formApiWhatsApp.handleSubmit(
          async (
            dadosApiWhatsapp: z.infer<typeof schemaFormularioApiWhatsApp>,
          ) => {
            const dadosConfig: ConfiguracoesWhatsappProps = {
              id: configuracaoWhatsapp?.id,
              loginApiWhatsapp: dadosApiWhatsapp.email,
              senhaApiWhatsapp: dadosApiWhatsapp.senha,
              tokenDispositivoApiWhatsapp:
                dadosApiWhatsapp.token_dispositivo_api_whatsapp,
            }

            salvarConfiguracoes(dadosConfig)
          },
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={formApiWhatsApp.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email do usuário</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="email"
                    placeholder="usuario@email.com.br"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formApiWhatsApp.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    type="password"
                    placeholder="senha do usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formApiWhatsApp.control}
            name="token_dispositivo_api_whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token do dispositivo da API</FormLabel>
                <FormControl>
                  <Input
                    className="line-clamp-3"
                    placeholder="Token do dispositivo da API"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-end">
          {isPending ? (
            <Button
              className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
              type="submit"
            >
              Salvar credenciais
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
