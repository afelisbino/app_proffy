'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email({
    message: 'Email do usuário inválido!',
  }),
  password: z.string().min(8, { message: 'Senha inválida' }),
})

export default function FormularioLogin() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push('/admin/painel')
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
        <Button
          className="shadow-md relative w-full flex justify-center font-alt font-semibold text-sm uppercase leading-none bg-app-blue-500 rounded text-white hover:bg-app-blue-700"
          type="submit"
        >
          Iniciar Sessão
        </Button>
      </form>
    </Form>
  )
}
