'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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

import { autenticarUsuario } from '../api/auth'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }).trim(),
  password: z
    .string({
      required_error: 'Necessário informar a senha.',
    })
    .trim(),
})

export default function FormularioLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    try {
      const responseAuth: { message: string; status: boolean } =
        await queryClient.fetchQuery({
          queryKey: ['auth', email, password],
          queryFn: () =>
            autenticarUsuario({
              email,
              senha: password,
            }),
        })

      if (responseAuth.status) {
        router.push('/admin/painel')
      }
    } catch (error) {
      toast.warning('Usuario ou senha incorreto ou desativado!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-white border-0"
                  placeholder="user@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-app-red-100 leading-none text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-white border-0"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-app-red-100 leading-none text-sm" />
            </FormItem>
          )}
        />
        {form.formState.isSubmitting ? (
          <Button
            className="relative w-full flex justify-center shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Aguarde...
          </Button>
        ) : (
          <Button
            className="shadow-md relative w-full flex justify-center font-alt font-semibold text-sm uppercase leading-none bg-app-blue-500 rounded text-white hover:bg-app-blue-700"
            type="submit"
          >
            Iniciar Sessão
          </Button>
        )}
      </form>
    </Form>
  )
}
