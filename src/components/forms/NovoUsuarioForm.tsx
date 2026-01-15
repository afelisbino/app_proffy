'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { inserirNovoUsuario } from '@/api/escola'
import {
  FormularioNovoUsuarioType,
  schemaFormularioNovoUsuario,
} from '@/schemas/SchemaUsuariosEscola'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'

export function NovoUsuarioForm() {
  const queryClient = useQueryClient()
  const formNovoUsuario = useForm<FormularioNovoUsuarioType>({
    resolver: zodResolver(schemaFormularioNovoUsuario),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      perfil: 'PROFESSOR'
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarNovoUsuario, isPending } = useMutation({
    mutationFn: ({ nome, email, senha, perfil }: FormularioNovoUsuarioType) =>
      inserirNovoUsuario({ nome, email, senha, perfil }),
    onError: () => {
      toast.error('Houve um problema ao salvar o usuário, tente novamente!')
    },
    onSuccess: (data) => {
      const listaUsuarios:
        | Array<{
            id: string
            nome: string
            email: string
            status: boolean
          }>
        | undefined = queryClient.getQueryData(['usuariosEscola'])

      queryClient.setQueryData(
        ['usuariosEscola'],
        [...(listaUsuarios ?? []), data],
      )

      formNovoUsuario.reset()
      toast.success('Usuário criado com sucesso!')
    },
  })

  return (
    <Form {...formNovoUsuario}>
      <form
        className="space-y-4"
        onSubmit={formNovoUsuario.handleSubmit(
          async (dados: FormularioNovoUsuarioType) => {
            await salvarNovoUsuario(dados)
          },
        )}
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formNovoUsuario.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={formNovoUsuario.control}
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
            control={formNovoUsuario.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha inicial do usuário</FormLabel>
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
        <FormField
          control={formNovoUsuario.control}
          name="perfil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perfil</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Perfil do usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PROFESSOR">Professor</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="flex flex-col md:flex-row gap-2 md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formNovoUsuario.reset()}
              className="shadow-md text-sm leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          {isPending ? (
            <Button
              className="shadow-md text-sm leading-none rounded "
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                className="shadow-md text-sm leading-none rounded "
                type="submit"
              >
                Salvar usuário
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
