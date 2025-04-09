'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
    FormularioEdicaoUsuarioType,
    schemaFormularioEdicaoUsuario,
    UsuarioType,
} from '@/schemas/SchemaUsuariosEscola'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FormularioNovoUsuarioProps {
  dadosUsuario: UsuarioType
}

export function EditarUsuarioForm({
  dadosUsuario,
}: FormularioNovoUsuarioProps) {
  const formEditUsuario = useForm<FormularioEdicaoUsuarioType>({
    resolver: zodResolver(schemaFormularioEdicaoUsuario),
    defaultValues: {
      id: dadosUsuario.id,
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
    },
    mode: 'onChange',
  })

  async function salvarDadosUsuario() {
    formEditUsuario.reset()
  }

  return (
    <Form {...formEditUsuario}>
      <form
        className="space-y-4"
        onSubmit={formEditUsuario.handleSubmit(salvarDadosUsuario)}
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formEditUsuario.control}
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

          <FormField
            control={formEditUsuario.control}
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
        </div>
        <DialogFooter className="flex flex-col md:flex-row gap-2 md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formEditUsuario.reset()}
              className="shadow-md text-sm uppercase leading-none bg-padrao-red rounded text-white hover:bg-red-800"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formEditUsuario.formState.isSubmitting ? (
            <Button
              className="shadow-md text-sm uppercase leading-none rounded text-white bg-sky-600  hover:bg-sky-700"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                className="shadow-md text-sm uppercase leading-none rounded text-white bg-sky-600  hover:bg-sky-700"
                type="submit"
              >
                Salvar
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
